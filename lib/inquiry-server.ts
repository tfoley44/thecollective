import { createHash } from "node:crypto";
import { contactEmail } from "./content";
import {
  INQUIRY_SUCCESS_MESSAGE,
  isValidEmail,
  validateInquiry,
  type ValidatedInquiry,
} from "./inquiry";

export const INQUIRY_RECIPIENT = contactEmail;
const MAX_REQUEST_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_NETWORK_ENTRIES = 2000;
const EMAIL_TIMEOUT_MS = 15_000;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const counters = new Map<string, { count: number; until: number }>();

type DeliveryOptions = {
  env?: NodeJS.ProcessEnv;
  fetcher?: typeof fetch;
  now?: () => number;
};

function response(
  status: number,
  message: string,
  extra: Record<string, string> = {},
) {
  return Response.json(
    { ok: status === 200, message },
    {
      status,
      headers: { "Cache-Control": "no-store", ...extra },
    },
  );
}

export function resetInquiryLimitsForTests() {
  counters.clear();
}

function isAllowedOrigin(request: Request, env: NodeJS.ProcessEnv): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin]);
  // Compare the routed Host for CSRF only; never use it for public absolute URLs.
  const host = request.headers.get("host");
  if (host && /^[a-z0-9.\-]+(?::\d{1,5})?$/i.test(host)) {
    allowed.add(`https://${host}`);
    if (/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host))
      allowed.add(`http://${host}`);
  }
  const configuredOrigins = [
    env.NEXT_PUBLIC_SITE_URL,
    ...(env.INQUIRY_ALLOWED_ORIGINS ?? "").split(","),
    env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "",
    env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "",
    env.VERCEL_BRANCH_URL ? `https://${env.VERCEL_BRANCH_URL}` : "",
  ];
  for (const value of configuredOrigins) {
    if (!value) continue;
    try {
      allowed.add(new URL(value.trim()).origin);
    } catch {
      /* Malformed optional origins do not grant access. */
    }
  }
  return origin !== null && allowed.has(origin);
}

function applyRateLimit(request: Request, now: number): Response | null {
  const ip =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  for (const [entry, limit] of counters)
    if (limit.until <= now) counters.delete(entry);
  const current = counters.get(key);
  if (current && current.count >= MAX_ATTEMPTS) {
    return response(
      429,
      "Too many attempts. Please wait a few minutes and try again.",
      {
        "Retry-After": String(Math.ceil((current.until - now) / 1000)),
      },
    );
  }
  if (counters.size >= MAX_NETWORK_ENTRIES && !current) {
    return response(429, "The form is busy. Please try again shortly.", {
      "Retry-After": "60",
    });
  }
  counters.set(key, {
    count: (current?.count ?? 0) + 1,
    until: current?.until ?? now + RATE_LIMIT_WINDOW_MS,
  });
  return null;
}

async function readLimitedJSON(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_REQUEST_BYTES)
    throw new RangeError("Request too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const decoder = new TextDecoder();
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      body += decoder.decode(value, { stream: true });
    }
    return JSON.parse(body + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

function emailPayload(inquiry: ValidatedInquiry, from: string) {
  return {
    from: `The Foley Collective Website <${from}>`,
    to: [INQUIRY_RECIPIENT],
    reply_to: inquiry.email,
    subject: `Website project inquiry: ${inquiry.projectType}`,
    text: `New inquiry from The Foley Collective website\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company || "Not specified"}\nProject type: ${inquiry.projectType}\nBudget: ${inquiry.budget}\nTiming: ${inquiry.timing}\n\nProject idea:\n${inquiry.message}`,
  };
}

async function deliverInquiry(
  inquiry: ValidatedInquiry,
  env: NodeJS.ProcessEnv,
  fetcher: typeof fetch,
): Promise<Response> {
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.INQUIRY_FROM_EMAIL?.trim();
  if (!apiKey || !from || !isValidEmail(from)) {
    return response(
      503,
      "Website email delivery is not configured yet. Your message has not been sent. Please try again later.",
    );
  }
  const payload = emailPayload(inquiry, from);
  const idempotency = createHash("sha256")
    .update(inquiry.requestId + JSON.stringify(payload))
    .digest("hex");
  try {
    const result = await fetcher(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `foley-inquiry/${idempotency}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
    if (!result.ok)
      return response(
        502,
        "We could not submit your inquiry. Your details are still in the form. Please try again shortly.",
      );
    const accepted: unknown = await result.json();
    if (
      !accepted ||
      typeof accepted !== "object" ||
      !("id" in accepted) ||
      typeof accepted.id !== "string" ||
      !accepted.id
    ) {
      return response(
        502,
        "Delivery could not be confirmed. Please try again shortly.",
      );
    }
    return response(200, INQUIRY_SUCCESS_MESSAGE);
  } catch {
    return response(
      502,
      "The email service could not confirm your inquiry. Your details are still in the form. Please try again shortly.",
    );
  }
}

export async function handleInquiry(
  request: Request,
  options: DeliveryOptions = {},
): Promise<Response> {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  if (request.method !== "POST")
    return response(405, "Use the website inquiry form.", { Allow: "POST" });
  if (!isAllowedOrigin(request, env))
    return response(403, "Submit from this website.");
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return response(415, "Please submit the website form.");
  const limited = applyRateLimit(request, (options.now ?? Date.now)());
  if (limited) return limited;

  let input: unknown;
  try {
    input = await readLimitedJSON(request);
  } catch (error) {
    return response(
      error instanceof RangeError ? 413 : 400,
      "Your request could not be read. Please review the form and try again.",
    );
  }
  const result = validateInquiry(input);
  return result.ok
    ? deliverInquiry(result.inquiry, env, fetcher)
    : response(400, result.message);
}
