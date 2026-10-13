import { createHash } from "node:crypto";

export const INQUIRY_RECIPIENT = "contact@thefoleycollective.com";
const TYPES = ["Mobile app", "Web platform", "MVP", "Not sure yet"];
const BUDGETS = [
  "Let’s discuss",
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000+",
];
const TIMINGS = [
  "Let’s figure it out",
  "As soon as practical",
  "Within 3 months",
  "3–6 months",
  "Just exploring",
];
const MAX_BYTES = 20_000;
const WINDOW_MS = 10 * 60 * 1000;
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

function text(
  value: unknown,
  limit: number,
  minimum = 0,
  multiline = false,
): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length < minimum || trimmed.length > limit) return null;
  if (
    multiline
      ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(trimmed)
      : /[\u0000-\u001f\u007f]/.test(trimmed)
  )
    return null;
  return trimmed;
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value);
}

async function readLimitedJSON(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (length > MAX_BYTES) throw new RangeError("Request too large");
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
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body);
  } finally {
    reader.releaseLock();
  }
}

export async function handleInquiry(
  request: Request,
  options: DeliveryOptions = {},
): Promise<Response> {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const now = (options.now ?? Date.now)();
  if (request.method !== "POST")
    return response(405, "Use the website inquiry form.", { Allow: "POST" });
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return response(403, "Submit from this website.");
  const origin = request.headers.get("origin");
  const allowed = new Set([new URL(request.url).origin]);
  // Host identifies the routed browser origin; Next.js may put 0.0.0.0 in request.url.
  // This is a CSRF comparison only, never a source of browser-facing absolute URLs.
  const host = request.headers.get("host");
  if (host && /^[a-z0-9.\-]+(?::\d{1,5})?$/i.test(host)) {
    allowed.add(`https://${host}`);
    if (/^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host)) {
      allowed.add(`http://${host}`);
    }
  }
  for (const value of [
    env.NEXT_PUBLIC_SITE_URL,
    ...(env.INQUIRY_ALLOWED_ORIGINS ?? "").split(","),
    env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "",
    env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "",
    env.VERCEL_BRANCH_URL ? `https://${env.VERCEL_BRANCH_URL}` : "",
  ]) {
    if (!value) continue;
    try {
      allowed.add(new URL(value.trim()).origin);
    } catch {
      /* Ignore malformed configuration. */
    }
  }
  if (!origin || !allowed.has(origin))
    return response(403, "Submit from this website.");
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return response(415, "Please submit the website form.");

  const ip =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  for (const [entry, limit] of counters)
    if (limit.until <= now) counters.delete(entry);
  const current = counters.get(key);
  if (current && current.count >= 5)
    return response(
      429,
      "Too many attempts. Please wait a few minutes and try again.",
      { "Retry-After": String(Math.ceil((current.until - now) / 1000)) },
    );
  if (counters.size >= 2000 && !current)
    return response(429, "The form is busy. Please try again shortly.", {
      "Retry-After": "60",
    });
  counters.set(key, {
    count: (current?.count ?? 0) + 1,
    until: current?.until ?? now + WINDOW_MS,
  });

  let input: unknown;
  try {
    input = await readLimitedJSON(request);
  } catch (error) {
    return response(
      error instanceof RangeError ? 413 : 400,
      "Your request could not be read. Please review the form and try again.",
    );
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return response(400, "Please review the form.");
  const raw = input as Record<string, unknown>;
  if (typeof raw.website !== "string" || raw.website.trim())
    return response(400, "The request could not be accepted.");
  const name = text(raw.name, 100, 1);
  const email = text(raw.email, 254, 3);
  const company = text(raw.company, 120);
  const message = text(raw.message, 3000, 15, true);
  const projectType = text(raw.projectType, 50, 1);
  const budget = text(raw.budget, 50, 1);
  const timing = text(raw.timing, 50, 1);
  const requestId = text(raw.requestId, 36, 36);
  if (
    !name ||
    !email ||
    !validEmail(email) ||
    company === null ||
    !message ||
    !projectType ||
    !TYPES.includes(projectType) ||
    !budget ||
    !BUDGETS.includes(budget) ||
    !timing ||
    !TIMINGS.includes(timing) ||
    !requestId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  ) {
    return response(
      400,
      "Please provide a valid name, email, and 15–3,000-character project description, and select the available project options.",
    );
  }
  const apiKey = env.RESEND_API_KEY?.trim();
  const from = env.INQUIRY_FROM_EMAIL?.trim();
  if (!apiKey || !from || !validEmail(from))
    return response(
      503,
      "Website email delivery is not configured yet. Your message has not been sent. Please try again later.",
    );
  const payload = {
    from: `The Foley Collective Website <${from}>`,
    to: [INQUIRY_RECIPIENT],
    reply_to: email,
    subject: `Website project inquiry: ${projectType}`,
    text: `New inquiry from The Foley Collective website\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "Not specified"}\nProject type: ${projectType}\nBudget: ${budget}\nTiming: ${timing}\n\nProject idea:\n${message}`,
  };
  const idempotency = createHash("sha256")
    .update(requestId + JSON.stringify(payload))
    .digest("hex");
  try {
    const result = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `foley-inquiry/${idempotency}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
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
    )
      return response(
        502,
        "Delivery could not be confirmed. Please try again shortly.",
      );
    return response(
      200,
      "Your inquiry has been submitted. Thank you—we’ll be in touch using the email address you provided.",
    );
  } catch {
    return response(
      502,
      "The email service could not confirm your inquiry. Your details are still in the form. Please try again shortly.",
    );
  }
}
