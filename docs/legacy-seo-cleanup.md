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
