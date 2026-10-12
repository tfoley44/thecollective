# The Foley Collective — App Development

A clean, light, minimal Next.js 15 / React 19 / Tailwind CSS 4 marketing website. The first version includes a homepage, project inquiry page, and privacy notice. Homepage sections: hero, product capabilities, strategy/design/development/launch services, process, about the collective, FAQ, and closing inquiry CTA.

## Run locally

Node.js 22 and pnpm 11.25.0 are used. The package manager and lockfile are pinned.

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm build
pnpm typecheck
```

The production build is a static export in `out/`. The preview listens on port 3000. Original supplied logos are preserved in the separate legacy vault; the web logo is a transparent crop from the supplied PDF. Fonts are self-hosted DM Sans and Instrument Serif from Google Fonts.

## Vercel handoff

Import this directory as a Vercel project or push it to your chosen repository and import the repository. V2 explicitly sets `outputDirectory: ".next"` in `vercel.json` and `distDir: ".next"` in `next.config.ts`, so the file-level setting overrides an old Vercel dashboard value of `out`. It retains the Next.js framework preset and frozen dependency installation. Its build command runs `pnpm build` and `scripts/verify-vercel-build.mjs`; successful logs include `FOLEY_VERCEL_FIX_V2: outputDirectory=.next; routing manifest verified.` The `out/` directory still contains the static website for generic static hosts and Manus; it is not the Vercel Next.js adapter's manifest directory. No database or secret is required for this version.

Deploy the V2 source files in the directory Vercel uses as its project Root Directory—the folder containing `package.json`, `vercel.json`, and `scripts/`. The V2 ZIP has those files at its root. Commit the new files and deploy that latest commit; redeploying an earlier failed commit cannot load these changes. Do not copy `routes-manifest.json` into `out`. If logs lack the V2 marker, check the deployed commit and Root Directory rather than repeatedly redeploying the same source.

Set `NEXT_PUBLIC_SITE_URL` to the approved final HTTPS origin at build time. Once the domain cutover is approved, that can be `https://thefoleycollective.com`. This activates canonical URLs, absolute social metadata, sitemap URLs, and indexable robots behavior. Without a configured origin, this preview intentionally disallows crawling and omits guessed canonical addresses.

Vercel authorization was offered but not accepted in this task. No Vercel deployment, DNS change, or replacement of the existing live site has been performed. A production cutover requires the owner's account/domain access and approval of the final site. Obtain a full export from the existing website builder before cutover; preserve the old configuration and backups for rollback. Review old URLs and map only genuinely relevant URLs to the new content; retired financial pages should not be represented as app-development case studies.

## Contact behavior

`lib/content.ts` contains the owner-approved contact destination: `contact@thefoleycollective.com`, supplied on October 12, 2026. The contact page, privacy contact link, and inquiry draft recipient all use this shared value. This website update does not create or configure the mailbox.

The project inquiry form validates required name, email, and a 15–3,000-character idea description. It gathers product type, company, budget, and timing, then opens a mailto draft. It does not send or store an inquiry. Copy and download fallbacks appear after draft preparation. The user sends the draft from their email app. This is explicit in the UI. Connecting a form backend, CRM, or transactional email provider would be a separate enhancement; update the privacy notice when that changes.

## Brand direction

Positioning: An independent app-development studio helping founders and businesses turn useful ideas into thoughtful digital products.

Voice: clear, considered, collaborative. Headlines are short and confident; supporting copy makes the product journey understandable without jargon. Core lines: “Good ideas. Great apps.” and “We turn your what-if into what’s next.” CTAs invite a conversation instead of promising a price or delivery date before scoping.

The hero uses interactive fictional product concepts, expressly labeled as illustrative. These are not client work, launched products, or performance claims. No app-development awards, testimonials, project counts, or client logos have been invented. All legacy digital-asset service copy has been excluded from the new public experience.

## Structure

- `app/`: statically generated routes, metadata, robots, sitemap, and styles.
- `components/`: responsive header/footer, interactive concept showcase, and inquiry form.
- `lib/content.ts`: shared copy and contact destination.
- `public/brand/`, `public/fonts/`: web-ready supplied brand assets and self-hosted fonts.
- `public/manus-routes.json`: complete page route manifest.
- `docs/brand-context.md`: reviewed sources, positioning notes, and archive boundaries.

## Legacy materials vault

The private available-materials vault is outside this repository and the public directory. It contains all 10 supplied original logo files, accessible old public pages, text copies, downloaded referenced assets, an inventory, and checksums. It is not a complete CMS, database, campaign, or social-account backup. No original file has been deleted and the existing live website remains unchanged. See the separately delivered vault README and manifest for capture status and missing-data boundaries.

## Approved coin favicon

`TheTransparentCoin.png` is now preserved in the project's shared branding files and `public/brand/`. It replaces the prior favicon throughout the site via the root layout, including the browser-tab ICO/PNG variants, shortcut icon, and Apple touch icon. The platform's compact project icon uses the coin too; the horizontal header/footer wordmark is unchanged. See `docs/brand-assets.md` for sizes, cache-versioning, and preservation details. The current branding package contains the original wordmark assets, the unmodified coin, and the browser-icon variants. The historical legacy vault remains unchanged.
