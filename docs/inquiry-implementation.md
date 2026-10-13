# Website-sent project inquiries

Replace the current mailto form with a same-origin POST to `/api/inquiries`. The browser remains on the contact page and displays sending, accepted, or failed status. Remove all email-app handoffs from the site, including email address links. Keep `contact@thefoleycollective.com` as the fixed company recipient.

The existing Next.js static export cannot execute a POST endpoint. Run normal Next.js on Vercel by removing `output: "export"`, keeping `distDir: ".next"` and Vercel `outputDirectory: ".next"`. Add a Node route handler and a matching container declaration for optional Manus hosting. No database or login is required.

Use Resend's HTTPS email API with a server-only `RESEND_API_KEY` and verified `INQUIRY_FROM_EMAIL`. Set the customer's validated address as reply-to, not the sender. Validate input on the server, cap request bytes, reject cross-origin browser submissions, use a honeypot, apply best-effort per-instance throttling, and use an idempotency key derived from the request ID and normalized content. Keep user data and credentials out of application logs. Provider acceptance is not proof of inbox delivery.

Required folders: `components/inquiry-form.tsx` owns form interaction; `lib/inquiry-server.ts` owns validation and delivery; `app/api/inquiries/route.ts` exposes the POST endpoint; `tests/inquiry.test.mjs` validates behavior with mocked delivery; `docs/website-email-setup.md` explains sender setup and deployment. No real email is sent during automated tests.

Account authorization, domain verification, Vercel runtime environment setup, and an owner-approved live test remain required before claiming working live delivery. Existing Apple/iCloud incoming mail DNS records must be preserved.
