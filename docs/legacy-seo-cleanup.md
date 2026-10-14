# Legacy SEO cleanup — proposed; not yet deployed

## Purpose
Retire discontinued cryptocurrency, gold, and digital-wealth business offers and legacy blog content from the current Foley Collective website's search footprint without harming the new app-development website.

## Verified findings (2026-10-13)
- Public search still showed a cached, older root homepage under the title "Terris Foley, CDAA - Crypto and Gold Investment Services." This is not evidence that the new root homepage currently serves that copy.
- An old Search Console crawl showed a retired article beginning with `/c/blog/b/Unlock-the-Power-of-Cold-Wallets...`. The full URL was not recovered reliably.
- The historical indexed homepage names six older articles; their exact individual URLs have not been established.
- The current site sitemap contains `/`, `/contact/`, and `/privacy/`; the sitemap was processed successfully in Search Console.
- Search Console accepted a fresh indexing request for the non-www homepage. Indexing is not immediate.

## Proposed automated rule
- Return HTTP 410 and `X-Robots-Tag: noindex` only for `/c/blog/*`.
- No blanket homepage redirects, no removal of the root domain from Google's index, and no changes to the contact form, DNS, or Resend.
- This middleware does not delete any historical article data stored at a former hosting provider; it changes only how the current Next.js/Vercel website responds to requests on this namespace after the PR merges.

## Other historical pages — review before changing
- 3-Day Crypto & Gold Challenge
- Digital Legacy Planning
- Older crypto consulting appointment pages
- Cryptocurrency/gold ebook lead magnets and downloads
- Retired newsletter and opt-in landing pages

No exact URLs have yet been verified for these offers. Locate them in historical sitemaps, old provider exports, backlinks, or future Search Console indexing reports. On verification, use 410 for obsolete pages with no equivalent, and 301/308 only for genuinely related replacements.

## Production validation checklist (before merging)
1. On Preview, `/c/blog/b/example-legacy-article` returns HTTP 410, not a 200 or unrelated redirect.
2. On Preview, `/`, `/contact/`, `/privacy/`, `/robots.txt`, and `/sitemap.xml` continue to work.
3. Confirm contact inquiries still send only via the authorized Resend service; never commit credentials.
4. Confirm production non-www canonical and www-to-apex redirect remain correct.
5. Review Vercel build results, then approve merge.

## Search Console after production release
- Do not use Removals on the root homepage or entire site.
- Reinspect exact retired URLs as they are discovered; they should return 410.
- Track deindexing as Google recrawls. Search listings may remain for days or weeks.
- Continue requesting updated homepage indexing only as needed, without repeated queue submissions.

## Work execution audit — October 13, 2026 (Pacific)
Reviewed PR #2 at head `a13111c8cebaf199fee041350c56031f91865d47`, against main `a365256b0496cddbf7e13080dc264342be3c0ada`. It was open, draft, unmerged and mergeable. Only middleware.ts and this document differed. Vercel's commit status was success.

### Verified production checks
| URL/path | Result |
| --- | --- |
| / | 200; current app-development title and canonical https://thefoleycollective.com/ |
| /contact/ | 200; own contact canonical |
| /privacy/ | 200; own privacy canonical |
| /sitemap.xml | 200; only the three current canonical pages |
| /robots.txt | 200; allows crawling and references the canonical sitemap |
| https://www.thefoleycollective.com/ | Direct 308 to https://thefoleycollective.com/ |
| /c/blog/b/example-legacy-article | 308 to slash URL, then 404; expected before release |

Rendered navigation links on the three current pages point to current pages and homepage sections. No obsolete offer links were found in the current app/component/content source scan. This is not a complete asset, mobile, or performance audit.

### Local production-build validation
Installed dependencies with the unchanged frozen lockfile; resolved Next.js 15.5.27.
- Production build passed, including compiled middleware.
- TypeScript check passed.
- All 20 existing inquiry tests passed with mocked delivery; no real email was sent.
- /c/blog/b/example-legacy-article/ and /c/blog/ returned 410 with X-Robots-Tag: noindex.
- Slashless legacy URLs returned the existing trailingSlash 308 first, then the slash URL returned 410. This is one normalization redirect, not a redirect to unrelated content.
- /c/blogger/ and /c/ remained 404, confirming the boundary does not retire neighboring paths.
- /, /contact/, /privacy/, /sitemap.xml, /robots.txt and /api/health/ returned 200.
- GET /api/inquiries/ returned 405; an invalid JSON inquiry POST returned 400. Middleware does not intercept the form endpoint.
- No runtime application correction was needed based on these checks.

### Preview release blocker
The Vercel bot linked this Preview:
https://thecollective-git-chore-legacy-se-b71ddd-thecollective-projects.vercel.app

An unauthenticated request returned 302 to Vercel SSO, and browser inspection showed Vercel login. The authentication response's noindex header is NOT proof of middleware execution. Deployed Preview 410 behavior, rendered form interaction and Preview environment configuration remain unverified. Do not remove deployment protection to test this.

### Legacy inventory and evidence limits
The previous handoff reports a Search Console article prefix under /c/blog/b/Unlock-the-Power-of-Cold-Wallets, but does not supply a complete URL. Current repository routes do not use the /c/blog namespace. Public search retrieved an older homepage description referencing crypto/gold offers; opening that same homepage returned current app-development content. Search snippets do not establish current Google indexing or complete article paths.

No additional complete legacy article or offer URL was recovered in this execution. No guessed paths or wider wildcard retirement rules were added. The example article is a synthetic test path, not an inventory record of an actual historical article.

| Historical content | Exact URL | Decision/status |
| --- | --- | --- |
| Old crypto/gold homepage copy | https://thefoleycollective.com/ | Preserve current homepage; recrawl must replace old description |
| Cold-wallet article | Not recovered; prefix only in handoff | Covered if actual URL falls within approved /c/blog namespace |
| Digital advisor vs financial planner | Not recovered | Await exact URL evidence |
| Five digital-asset safety tips | Not recovered | Await exact URL evidence |
| Unraveling Cryptocurrency | Not recovered | Await exact URL evidence |
| CBDCs Are Coming | Not recovered | Await exact URL evidence |
| Stellar utility projects article | Not recovered | Await exact URL evidence |
| Challenge, legacy planning, consulting, ebook and newsletter offers | Not recovered | Await exact URL evidence; no rule added |

Before broadening retirement, obtain complete URLs from Search Console exports, former-host sitemap/export, or verified backlink records, then capture first response, redirect destination and terminal response for each. Review any founder biography material separately.

### Prioritized release work
1. Authenticate to the protected Preview and verify deployed 410, current pages and form behavior. Check the latest deployment after any branch update.
2. Keep the PR draft until Preview checks pass. Then prepare final approval with the reviewed commit SHA.
3. Obtain explicit production release approval before merging; do not modify DNS, email records or secrets.
4. After release, recheck actual retired URLs and sitemap/canonicals on production; track recrawl without repeated indexing submissions.
5. Recover exact additional offer/article URLs before preparing a separate expansion.
6. Keep brand-film integration on hold until final assets are confirmed. Prepare social messaging around “Good ideas. Great apps.” separately; no public profile edits or deletions in this phase.

No production, DNS, secret, Search Console submission, social-profile or third-party historical-content changes were made during this audit.
