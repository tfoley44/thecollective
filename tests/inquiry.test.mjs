import { beforeEach, after, test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";

const root = new URL("../", import.meta.url);
const compiled = mkdtempSync(join(tmpdir(), "foley-inquiry-test-"));
execFileSync(
  process.execPath,
  [
    new URL("node_modules/typescript/bin/tsc", root).pathname,
    new URL("lib/inquiry-server.ts", root).pathname,
    "--module",
    "commonjs",
    "--target",
    "es2022",
    "--skipLibCheck",
    "--outDir",
    compiled,
  ],
  { cwd: root },
);
const { handleInquiry, resetInquiryLimitsForTests } = createRequire(
  import.meta.url,
)(join(compiled, "inquiry-server.js"));
after(() => rmSync(compiled, { recursive: true, force: true }));
beforeEach(resetInquiryLimitsForTests);

const fields = {
  name: "Test Customer",
  email: "customer@example.com",
  company: "Sample company",
  projectType: "Mobile app",
  budget: "Let’s discuss",
  timing: "Let’s figure it out",
  message: "A sample inquiry used only in mocked automated tests.",
  website: "",
  requestId: "7f498955-c998-4f0a-8ea8-8e2f24747758",
};
const env = {
  RESEND_API_KEY: "mock-only-not-a-real-key",
  INQUIRY_FROM_EMAIL: "website@forms.thefoleycollective.com",
};
const request = (body = fields, headers = {}, method = "POST") =>
  new Request("https://foley.example/api/inquiries/", {
    method,
    headers: {
      origin: "https://foley.example",
      "content-type": "application/json",
      ...headers,
    },
    ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
  });
const failFetch = async () => {
  throw new Error("Unexpected outbound request");
};

test("accepted submission targets only the company and uses customer reply-to", async () => {
  let call;
  const result = await handleInquiry(
    request({
      ...fields,
      to: "attacker@example.com",
      from: "spoof@example.com",
    }),
    {
      env,
      fetcher: async (url, options) => {
        call = { url, options };
        return Response.json({ id: "mock-email-id" });
      },
    },
  );
  assert.equal(result.status, 200);
  assert.equal(call.url, "https://api.resend.com/emails");
  const body = JSON.parse(call.options.body);
  assert.deepEqual(body.to, ["contact@thefoleycollective.com"]);
  assert.equal(body.reply_to, fields.email);
  assert.equal(
    body.from,
    "The Foley Collective Website <website@forms.thefoleycollective.com>",
  );
  assert.ok(body.text.includes(fields.message));
  assert.equal(result.headers.get("cache-control"), "no-store");
});

test("missing runtime credentials fail closed", async () => {
  const r = await handleInquiry(request(), { env: {}, fetcher: failFetch });
  assert.equal(r.status, 503);
  assert.equal((await r.json()).ok, false);
});
test("unverified-format sender is rejected before delivery", async () => {
  assert.equal(
    (
      await handleInquiry(request(), {
        env: { ...env, INQUIRY_FROM_EMAIL: "bad sender" },
        fetcher: failFetch,
      })
    ).status,
    503,
  );
});
test("invalid email, field lengths, description, and unknown options are rejected", async () => {
  for (const changed of [
    { email: "invalid" },
    { name: "x".repeat(101) },
    { company: "x".repeat(121) },
    { message: "too short" },
    { message: "x".repeat(3001) },
    { projectType: "Other" },
    { requestId: "bad" },
    { budget: "anything" },
    { timing: "anything" },
  ]) {
    resetInquiryLimitsForTests();
    assert.equal(
      (
        await handleInquiry(request({ ...fields, ...changed }), {
          env,
          fetcher: failFetch,
        })
      ).status,
      400,
    );
  }
});
test("header injection is rejected", async () => {
  assert.equal(
    (
      await handleInquiry(
        request({ ...fields, email: "a@example.com\r\nBcc:other@example.com" }),
        { env, fetcher: failFetch },
      )
    ).status,
    400,
  );
});
test("filled spam honeypot is rejected without pretending success", async () => {
  const r = await handleInquiry(request({ ...fields, website: "spam" }), {
    env,
    fetcher: failFetch,
  });
  assert.equal(r.status, 400);
  assert.equal((await r.json()).ok, false);
});
test("cross-origin and cross-site browser requests are rejected", async () => {
  assert.equal(
    (
      await handleInquiry(request(fields, { origin: "https://evil.example" }), {
        env,
        fetcher: failFetch,
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await handleInquiry(request(fields, { "sec-fetch-site": "cross-site" }), {
        env,
        fetcher: failFetch,
      })
    ).status,
    403,
  );
});
test("explicit production origin supports proxy requests", async () => {
  const r = await handleInquiry(
    request(fields, { origin: "https://thefoleycollective.com" }),
    {
      env: { ...env, NEXT_PUBLIC_SITE_URL: "https://thefoleycollective.com" },
      fetcher: async () => Response.json({ id: "mock" }),
    },
  );
  assert.equal(r.status, 200);
});
test("request byte limit is enforced", async () => {
  assert.equal(
    (
      await handleInquiry(request({ ...fields, message: "x".repeat(21000) }), {
        env,
        fetcher: failFetch,
      })
    ).status,
    413,
  );
});
test("malformed JSON and non-JSON requests are rejected", async () => {
  const malformed = new Request("https://foley.example/api/inquiries/", {
    method: "POST",
    headers: {
      origin: "https://foley.example",
      "content-type": "application/json",
    },
    body: "{broken",
  });
  assert.equal(
    (await handleInquiry(malformed, { env, fetcher: failFetch })).status,
    400,
  );
  assert.equal(
    (
      await handleInquiry(request(fields, { "content-type": "text/plain" }), {
        env,
        fetcher: failFetch,
      })
    ).status,
    415,
  );
});
test("provider rejection and network failure never report success", async () => {
  for (const fetcher of [
    async () => Response.json({ message: "private error" }, { status: 403 }),
    async () => {
      throw new Error("timeout");
    },
    async () => Response.json({}),
  ]) {
    resetInquiryLimitsForTests();
    const r = await handleInquiry(request(), { env, fetcher });
    assert.equal(r.status, 502);
    assert.equal((await r.json()).ok, false);
  }
});
test("retries use the same idempotency key; changed content gets a different key", async () => {
  const keys = [];
  const fetcher = async (_url, opts) => {
    keys.push(opts.headers["Idempotency-Key"]);
    return Response.json({ id: "mock" });
  };
  for (const body of [
    fields,
    fields,
    { ...fields, message: fields.message + " More." },
  ])
    await handleInquiry(request(body), { env, fetcher });
  assert.equal(keys[0], keys[1]);
  assert.notEqual(keys[1], keys[2]);
});
test("best-effort throttle rejects a sixth request and expires", async () => {
  const fetcher = async () => Response.json({ id: "mock" });
  for (let i = 0; i < 5; i++)
    assert.equal(
      (await handleInquiry(request(), { env, fetcher, now: () => 1000 }))
        .status,
      200,
    );
  const r = await handleInquiry(request(), { env, fetcher, now: () => 1000 });
  assert.equal(r.status, 429);
  assert.ok(r.headers.get("retry-after"));
  assert.equal(
    (await handleInquiry(request(), { env, fetcher, now: () => 601001 }))
      .status,
    200,
  );
});
test("GET cannot send email", async () => {
  assert.equal(
    (
      await handleInquiry(request(fields, {}, "GET"), {
        env,
        fetcher: failFetch,
      })
    ).status,
    405,
  );
});

test("same-origin host survives Next.js internal URL reconstruction", async () => {
  const proxied = new Request("http://0.0.0.0:3000/api/inquiries/", {
    method: "POST",
    headers: {
      origin: "http://127.0.0.1:3000",
      host: "127.0.0.1:3000",
      "content-type": "application/json",
    },
    body: JSON.stringify(fields),
  });
  assert.equal(
    (await handleInquiry(proxied, { env: {}, fetcher: failFetch })).status,
    503,
  );
});
