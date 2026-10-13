# The Foley Collective — App Development

A clean, light, minimal Next.js 15 / React 19 / Tailwind CSS 4 marketing website. Pages: homepage, project inquiry page, and privacy notice. Homepage sections cover capabilities, app strategy/design/development/launch, process, the collective, FAQ, and inquiry CTAs.

## Run locally

Use Node.js 22 and pnpm 11.25.0. The package manager and lockfile are pinned.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm check
pnpm build
node scripts/verify-vercel-build.mjs
```

`pnpm check` runs formatting checks, strict TypeScript checks, and 20 mocked regression tests. Use `pnpm format` to apply the checked-in formatting conventions. Tests never send real email.

The current V3 uses normal Next.js server hosting. It is **not a static export**: `/api/inquiries/` requires a server. Keep `distDir: ".next"` in `next.config.ts` and `outputDirectory: ".next"` in `vercel.json`. The previously successful V2 output-directory correction is retained. Do not publish the old `out/` folder for V3, since it cannot run the email endpoint.

## Vercel handoff

Deploy the folder containing `package.json`, `vercel.json`, `scripts/`, `app/`, and `lib/`. Select Next.js. The included `vercel.json` installs frozen dependencies, runs the build and manifest verification, and explicitly overrides the output directory to `.next`. Its logs include the retained `FOLEY_VERCEL_FIX_V2` marker and a new `FOLEY_WEBSITE_EMAIL_V3` marker for the compiled API endpoint.

Set `NEXT_PUBLIC_SITE_URL` to the approved final HTTPS origin at build time. Configure server-only `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` as Vercel environment variables for the environments you intend to use, and redeploy after changes. Do not put the API key in a `NEXT_PUBLIC_` variable, source code, a ZIP, or browser code. See `docs/website-email-setup.md` for exact steps.

On October 12, 2026, the live V3 website, production Vercel variable scopes, verified sending domain, and a live form submission were independently checked. Resend reported the labeled test delivered to `contact@thefoleycollective.com`. This confirms recipient mail-server acceptance, not inbox placement or manual receipt. See `docs/deployment-status.md`. The source cleanup does not change or redeploy that working production version, its variables, or DNS.

For optional Manus publication, the project uses server capability without a database and its root `Dockerfile`; `/api/health` is the unauthenticated health endpoint. Never restore the old plain-static `out` publish configuration for V3.

## Contact behavior

The recipient is fixed at `contact@thefoleycollective.com`. The visible address is preserved, but mailto links have been removed. “Send my inquiry” submits to a same-origin server endpoint and stays on the page. The customer email is the reply-to address, never the provider sender or arbitrary destination.

Both browser and server validate required fields. The endpoint limits request size, rejects cross-origin browser posts, uses a honeypot and best-effort per-instance throttling, and deduplicates retries using Resend idempotency keys. Per-instance throttling is not a distributed rate-limit guarantee; stronger production abuse protection can be added in Vercel's firewall. Automated tests mock the provider and never send live mail.

Missing credentials, invalid inputs, provider rejection, or network failure never display successful submission. Input remains available after errors. Success means the email provider accepted the request, not that the recipient inbox delivered it. The website keeps no separate inquiry database and does not create a company mailbox; the privacy page describes provider and inbox handling.

## Brand direction

Positioning: an independent app-development studio helping founders and businesses turn useful ideas into thoughtful digital products. Voice: clear, considered, collaborative. Core lines: “Good ideas. Great apps.” and “We turn your what-if into what’s next.” CTAs invite a conversation instead of promising a price or delivery date before scoping.

Hero product concepts are clearly labeled illustrations, not client work or performance claims. No awards, testimonials, project counts, or client logos have been invented. Legacy digital-asset service copy is excluded.

## Structure

- `app/`: public pages, SEO metadata, styles, inquiry API, and health endpoint.
- `components/`: responsive navigation, product showcase, and inquiry UI.
- `lib/content.ts`: shared marketing copy and displayed contact address.
- `lib/inquiry.ts`: typed browser-safe inquiry options, field limits, validation, and success wording.
- `lib/inquiry-server.ts`: server request protection, parsing, throttling, and provider delivery using the shared company recipient.
- `public/brand/`, `public/fonts/`: supplied web-ready assets and self-hosted fonts.
- `public/manus-routes.json`: public page routes; APIs are not page routes.
- `tests/inquiry.test.mjs`: mocked email handling checks.
- `docs/`: brand context, historical deployment notes, and current email setup.

## Preserved brand and legacy files

The approved coin remains the site-wide browser/Apple icon and compact project mark. The horizontal wordmark is unchanged. Supplied brand originals remain in shared files and the private vault outside the repository and public directory. The vault is an available-materials capture, not a complete CMS/database/campaign backup. No original file is deleted by V3. Fonts remain self-hosted DM Sans and Instrument Serif.
