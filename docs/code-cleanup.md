# Behavior-preserving source cleanup

## Scope

Consolidate the inquiry form's duplicated options, field limits, validation, and success wording into a typed shared contract. Make request protection, validation, and email delivery easier to follow without changing their order or public responses. Remove dead styles from the retired email-draft form and obsolete concept caption, consolidate late CSS overrides, and provide consistent source formatting and check commands.

Keep the company recipient, verified sender configuration names, customer reply-to, `/api/inquiries/` endpoint, all visible form fields, throttling window, request-size limit, idempotency, error behavior, `.next` deployment configuration, branding, and site design unchanged. Do not alter DNS, account credentials, or the working Vercel production deployment as part of this source cleanup.

## Source structure

- `lib/inquiry.ts`: browser-safe shared form contract, options, limits, types, and server input validation. No credentials or Node imports.
- `lib/inquiry-server.ts`: server-only HTTP protections, request parsing, throttling, provider delivery, and no-store responses.
- `components/inquiry-form.tsx`: browser interaction and rendering using the shared contract.
- `tests/inquiry.test.mjs`: mocked delivery and validation regressions; never sends live email.
- `app/globals.css`: existing design rules with unused selectors removed and overrides integrated.

The local source is maintained in the Manus canonical repository. The user's separate Vercel-connected repository and environment settings are not replaced by saving this cleanup.

## Completed validation

Formatting, strict TypeScript checking, all 20 mocked regression tests, production compilation, and the unchanged Vercel route-manifest verification passed. The production dependency audit reported no known vulnerabilities. A separate old/new handler comparison matched status codes, messages, headers, serialized provider payloads, and idempotency keys across 80 mocked cases. Effective CSS declarations matched at 10 responsive widths after excluding the eight removed unused rules. A focused read-only review found no confirmed regressions.

The cleaned sandbox production server served the homepage, contact and privacy routes, favicon declarations, route manifest, health endpoint, and real 404 successfully. No real email was sent during this cleanup. Brand assets, homepage copy, showcase, root layout, and Vercel/Next.js configuration files are unchanged.

## Using the cleaned source

The complete cleaned source bundle contains the shared inquiry module, updated test harness, formatting configuration, and lockfile. Keep your existing Vercel project and its working Production environment variables. Merge this source into the actual Vercel-connected repository, preserving any separate changes you made. `pnpm check` and the configured build command are the repeatable checks. If you choose to deploy the cleaned source, deploy its new commit; there is no need to recreate Resend, reset DNS, or re-enter working secrets.

This cleanup was saved to the Manus canonical repository, not pushed to the user's separate production repository, and it was not deployed to Vercel. The existing live V3 remains the last provider-delivery-verified version. Do not confuse cleaned-source build success with a new live deployment.
