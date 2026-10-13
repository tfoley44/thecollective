# Approved outcomes

- [x] Responsive app-development marketing website built with Next.js and Tailwind CSS and configured for Vercel deployment. Clean, light, minimal visual direction; responsive navigation and accessible interactions. Implemented in app/ and components/ with a successful static production build.
- [x] New positioning, messaging, and website copy focused exclusively on The Foley Collective’s app-development services. Homepage hero with a clear value proposition and primary inquiry call to action.
- [x] Services explaining app strategy, product design, development, launch, and ongoing support; process explaining discovery through delivery; company/about content aligned with the new direction without invented achievements or testimonials. Product showcase disclosure is visible and semantic.
- [x] Contact/project inquiry experience for prospective app-development clients, using a publicly published email and explicit email-draft behavior rather than pretending to send or store inquiries. Includes copy/download fallback; inbox deliverability requires owner confirmation before launch.
- [x] Integration and presentation of the supplied The Foley Collective logo assets. Unmodified originals are retained; transparent web logo and icon are derived from the supplied PDF.
- [x] Retirement of legacy content from the new public experience. Non-public vault organization for storing available legacy website materials and all supplied original assets, outside the website public directory and repository. Existing production site remains unchanged until authorized cutover; CMS-only/private content requires an owner export. No public vault application is requested. Captured six distinct accessible public pages, 35 referenced assets, and all 10 supplied logo originals; archive checksums and ZIP integrity verified.
- [x] Working preview, successful production build, and Vercel-ready source handoff. TypeScript checks passed and production dependency audit reports no known vulnerabilities. Route manifest, raw initial page HTML, page metadata, asset responses, and real 404 verified.
- [x] Save the reviewed source to the canonical Git repository. Implementation commit f046ac5 was accepted on origin/main, followed by the completion record; not dependent on Vercel publication.
- [ ] Confirm a platform checkpoint receipt. Canonical Git pushes succeeded, but no structured platform checkpoint card or Version history result was returned by this session. Source backup is verified; platform version bookkeeping is not separately confirmed.
- [ ] Vercel account connection and domain cutover. Vercel authorization was offered but not accepted; no production deployment or DNS/old-site change was performed.

- [x] Add the supplied `TheTransparentCoin.png` to shared branding files, preserve the original without alterations, and replace the favicon on every website page. Include multi-resolution browser/shortcut icons, Apple touch icons, default favicon paths, and the compact platform project icon while keeping the horizontal wordmark unchanged.

- [x] Update the company email to `contact@thefoleycollective.com` across the contact page, privacy contact link, and project inquiry draft recipient. Current website documentation uses the same owner-approved address. Displayed email and mailto links verified in the public preview; TypeScript checks passed. Historical vault copies remain unchanged; no email was sent and no mailbox was provisioned.

- [x] Correct the Vercel missing `/vercel/path0/out/routes-manifest.json` build failure by removing the `outputDirectory: "out"` override from `vercel.json`. Keep the Next.js preset and static-export application configuration. Update source documentation and the publishing guide to require Vercel's Output Directory override OFF. Local production build and TypeScript checks passed; `.next/routes-manifest.json` and `out/index.html` were verified. Hosted Vercel redeployment and dashboard-setting changes are not claimed.

- [x] Apply a source-level V2 correction for the repeated Vercel `/out/routes-manifest.json` failure: set `vercel.json` outputDirectory to `.next`, explicitly set Next.js distDir to `.next`, and include a post-build manifest verification script that prints `FOLEY_VERCEL_FIX_V2`. The exact Vercel buildCommand and TypeScript checks passed locally. Package the complete V2 source with files at ZIP root and preserve current coin branding and company email. Owner-account hosted redeployment is not claimed.

## Website email delivery update

- [x] The inquiry form sends from the website to contact@thefoleycollective.com without opening Apple Mail or another email app. Preserve all current inquiry fields and required validation. Show sending, accepted, and failed states honestly; retain user input after errors and prevent repeated clicks while sending.
- [x] Add a server-only email endpoint with validated input, a fixed recipient, verified sender configuration, customer reply-to, request-size limit, cross-origin protection, spam honeypot, best-effort throttling, and retry deduplication. Do not expose provider secrets or log inquiry content.
- [x] Retain the successful Vercel .next output-directory fix, enable a normal Next.js server build, update build verification, and provide source/patch files and setup instructions. Update privacy and contact copy to match real submissions. Preserve existing wordmark, coin favicon, and company email.
- [ ] Authorize the sending account, verify its sender domain, set runtime secrets in Vercel, and verify an authorized live submission arrives in the company inbox. Until then, distinguish tested source from live delivery.

Source evidence: production build and TypeScript checks passed; 15 mocked delivery tests passed; read-only review found no confirmed defects. Production and public-preview HTTP tests verified no mailto links, preserved icons, same-origin API behavior, cross-origin rejection, and honest 503 failure with no sending credentials. Live provider acceptance and inbox delivery remain unverified.

## Current status and source cleanup — October 12, 2026

Earlier entries describe historical delivery stages, including the retired mailto form, static export, and pending account access. Current V3 supersedes those stages: normal Next.js server hosting, direct submissions, verified Resend sending domain, Production email variables, and a live test reported delivered by Resend. Human inbox visibility and ordinary mailbox sending are separate from provider delivery. Platform checkpoint receipt remains unconfirmed unless separately returned.

- [x] Shared typed inquiry contract: keep every existing option, visible field, limit, and success message while eliminating duplicated browser/server constants.
- [x] Readable server stages: preserve method/origin/content-type checks, request byte limit, honeypot, best-effort throttle, customer reply-to, fixed company recipient, retry idempotency, private responses, and runtime secret names.
- [x] Remove unused email-draft and concept-caption styles and consolidate late CSS overrides without altering the existing layout or branding.
- [x] Add pinned formatting conventions, `pnpm format`, `pnpm format:check`, and `pnpm check`; extend mocked regressions from 15 to 20 and compile the test fixture with strict TypeScript settings.
- [x] Final production build and focused behavior-equivalence review of the cleaned source. Build and 20 tests passed; 80 old/new handler comparisons matched; effective stylesheet declarations matched at 10 widths; read-only review found no confirmed regressions.
- [x] Save and package the cleaned source separately from the working Vercel production deployment. Keep live environment settings, DNS, and user repository changes untouched. The complete cleaned source ZIP is packaged from the canonical commit; it is not a Vercel deployment.
