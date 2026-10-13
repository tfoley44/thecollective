# Website-sent project inquiries

The contact form submits a same-origin POST to `/api/inquiries/`, stays in the browser, and reports sending, accepted, or failed status. The recipient comes from the shared company address in `lib/content.ts`: `contact@thefoleycollective.com`. The validated customer address is Reply-To, never the provider sender or an arbitrary recipient.

## Modules

- `lib/inquiry.ts`: browser-safe option arrays, field limits, result types, success wording, and server input normalization/validation.
- `components/inquiry-form.tsx`: uses the shared options/limits; keeps fields on errors, guards concurrent submissions, and reuses a request ID for unchanged retries.
- `lib/inquiry-server.ts`: named helpers for origin protection, bounded per-instance counters, streamed request parsing, payload construction, and provider delivery.
- `app/api/inquiries/route.ts`: thin Node.js POST handler, unchanged during cleanup.
- `tests/inquiry.test.mjs`: strict TypeScript compilation and 20 mocked tests; no real email is sent.

## Request order and boundaries

Method → origin → JSON content type → best-effort rate limit → request byte limit/parsing → validated fields and honeypot → configured sender/key → Resend delivery. Each failure retains its prior status/message and no-store response. Retry idempotency continues to hash the request ID and the same serialized normalized email payload. No inquiry content or secret is logged.

`RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` remain server-only runtime configuration. Missing configuration fails honestly. A success response means provider acceptance, not inbox placement. The per-instance throttle is not a distributed abuse-protection guarantee.

## Deployment

Normal Next.js server hosting is required; do not enable static export. Keep Next.js `distDir` and Vercel outputDirectory set to `.next`, and retain the compiled-route verification script. No database or login is required. The working production V3 delivered a labeled test according to Resend; see `deployment-status.md`. Cleanup leaves production variables, DNS, and deployment untouched.
