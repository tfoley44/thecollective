# The Foley Collective — Digital Operations

Updated October 13, 2026 (Pacific). Central Project Director: execution assistant. Final release authority: Terris Foley. Brand: **Good ideas. Great apps.** Positioning: founder-led app-development studio.

This is the single operating record for four functions: project management, engineering, SEO and brand, and marketing production. These are responsibilities within one project, not separate agents or duplicate projects. No unattended monitoring or scheduled jobs have been established.

## 1. Master project dashboard

| Workstream             | Status                                     | Evidence / next gate                                                                                                   | Responsible function |
| ---------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Environment and source | Verified                                   | Repository cloned; PR #2 is open, draft and unmerged; direct GitHub API reports clean mergeability                     | Engineering          |
| SEO retirement         | Implemented in development                 | `/c/blog/:path*` only; 410 plus noindex; no wider paths inferred                                                       | SEO / Engineering    |
| Local release QA       | Build and inquiry tests passed             | Next.js 15.5.27; 20 mocked inquiry tests; run repeatable smoke checks for each candidate                               | Engineering          |
| Vercel deployment      | Build check passed; application QA blocked | Reviewed head `97c92519b8c19a44ab36ac65486009831de67378`; recheck after branch updates                                 | Engineering          |
| Protected Preview      | Blocked                                    | HTTP 302 to Vercel SSO; browser opening denied by security policy; no protected application response verified          | Engineering          |
| Live website           | Read-only checks passed                    | Homepage, contact, privacy, sitemap and robots return 200; page canonicals use apex domain                             | SEO                  |
| Additional legacy URLs | Evidence needed                            | Exact old article and offer paths unavailable; do not invent paths or expand wildcards                                 | SEO                  |
| Google indexing        | Await current evidence                     | Handoff reports successful sitemap submission and indexing request; current Search Console reports not accessed        | SEO                  |
| Brand film             | Final asset confirmation needed            | Handoff expects 4K / 1080p / captions / social variants; existing v3 file breadcrumb does not establish final approval | Marketing            |
| Social rebrand         | Draft preparation underway                 | Copy and staged calendar below; no profiles changed or posts published                                                 | Marketing            |

**Release milestone:** PR #2 may proceed to final approval only after authenticated Preview QA passes on the exact latest commit. No production approval is currently recorded.

**Sources:** Master handoff supplied as Pasted text.txt; [PR #2](https://github.com/tfoley44/thecollective/pull/2); repository source and local build output. Public search retrieved an older root description but recovered no additional exact legacy URLs. Search results are not a current Google indexing report.

### Coordination rules

- At each execution batch, take the highest-priority unblocked task, update its evidence and status, and report completed work and blockers.
- Engineering supplies the commit, build and regression evidence. SEO reviews route decisions and current metadata. Marketing prepares approved brand materials. Project management records release gates and decisions.
- Record a result as verified only with a source, date and applicable commit or URL. Keep handoff assertions distinct from new checks.
- Keep changes on `chore/legacy-seo-cleanup` for this release. Use a separate `feat/brand-film` branch after final assets are confirmed. Keep secrets, private archives and build outputs outside commits.
- Production, merges, DNS, external publishing and important asset deletion require explicit owner approval. Routine reversible development and read-only audits are authorized.

## 2. Prioritized task backlog

| ID     | Priority | Task / acceptance criterion                                                                            | Status                                  | Dependency / owner                     |
| ------ | -------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------- | -------------------------------------- |
| ENG-01 | P0       | Review PR #2 diff and exact deployed SHA                                                               | Done for initial head                   | Engineering                            |
| ENG-02 | P0       | Build, typecheck and 20 inquiry tests; preserve delivery contract                                      | Done: build, typecheck and tests passed | Engineering                            |
| ENG-03 | P0       | Repeatable route, canonical, sitemap, robots and retirement boundary smoke check                       | Prepared                                | Engineering                            |
| ENG-04 | P0       | Authenticated Preview: 410, slash normalization, adjacent 404s, current pages, mobile form interaction | Blocked                                 | Preview access / Engineering           |
| PM-01  | P0       | Present release candidate SHA, evidence and rollback plan for owner approval                           | Waiting                                 | ENG-04 / Project management            |
| SEO-01 | P1       | Recover exact legacy URLs from prior host/export, verified backlinks or Search Console                 | Blocked on evidence                     | SEO                                    |
| SEO-02 | P1       | For each real URL, capture first response, redirects, terminal status and replacement relevance        | Waiting                                 | SEO-01 / SEO                           |
| SEO-03 | P1       | After approved release, verify production retirement and preserved pages                               | Waiting                                 | Release approval / Engineering         |
| SEO-04 | P1       | Inspect current indexing report; record discovered vs indexed pages and stale root title               | Waiting                                 | Search Console access / SEO            |
| ENG-05 | P2       | Mobile, keyboard and performance audit; prioritize evidenced defects                                   | Open                                    | Available UI access / Engineering      |
| MKT-01 | P2       | Confirm final film version, captions, poster, formats and rights                                       | Waiting                                 | Asset confirmation / Marketing         |
| ENG-06 | P2       | Click-to-play film beneath hero; no audio autoplay; responsive and deferred load                       | Waiting                                 | MKT-01 / Engineering                   |
| MKT-02 | P2       | Review social account inventory, current bios and linked URLs                                          | Open                                    | Verified account URLs / Marketing      |
| MKT-03 | P2       | Approve profile copy, launch post and production calendar                                              | Draft ready                             | Owner review / Marketing               |
| PM-02  | P3       | Final live audit and project completion report                                                         | Waiting                                 | All release gates / Project management |

## 3. Decision and approval log

| ID   | Decision                                                              | Status / authority                          | Scope                                                         |
| ---- | --------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| D-01 | Execute development, research and non-production testing autonomously | Approved by current user instruction        | Routine reversible work                                       |
| D-02 | Selectively retire obsolete crypto/gold content                       | Approved in handoff and current instruction | Verified namespace and URLs only; preserve valuable biography |
| D-03 | Preserve form, Google Workspace, Resend and DNS                       | Required                                    | No secret, mail or DNS changes                                |
| D-04 | Maintain one coordinated project with four functions                  | Approved by current user instruction        | This operating record                                         |
| D-05 | Merge PR #2 / release retirement to Production                        | Pending                                     | Exact reviewed candidate SHA required                         |
| D-06 | Broaden retirement to other offer/article routes                      | Evidence needed                             | Complete URLs and relevance review first                      |
| D-07 | Final film selection and website placement                            | Pending asset confirmation                  | Separate development branch                                   |
| D-08 | Publish social profiles and campaign                                  | Pending                                     | Specific copy, accounts and timing                            |
| D-09 | Browser opening of protected Preview                                  | Denied by browser security policy           | No alternate route attempted to circumvent denial             |

A production decision must name the candidate commit, checks completed, remaining limitations and permitted release action. Approval for this development batch is not approval to merge.

## 4. Technical deployment checklist

### Before owner approval

- [x] Review original PR diff: only retirement middleware and SEO audit document.
- [x] Install dependencies with unchanged frozen lockfile.
- [x] Production build completes with middleware and inquiry route.
- [x] All 20 inquiry tests pass using mocked delivery; no real email sent.
- [x] Local candidate typecheck, formatting and repeatable smoke checks pass; remote candidate SHA is recorded in PR metadata.
- [ ] Latest candidate Vercel check passes after development changes.
- [ ] Authenticate to protected Preview through an authorized session; retain deployment protection.
- [ ] Verify `/c/blog/` and nested retired path return 410 with noindex; slashless path may normalize with 308 first.
- [ ] Verify `/c/` and `/c/blogger/` remain 404.
- [ ] Verify `/`, `/contact/`, `/privacy/`, sitemap, robots, page canonicals, navigation and mobile interaction.
- [ ] Verify Preview form validation and delivery configuration; do not send a real message without authorized test recipient and purpose. Mocked tests alone do not prove live delivery.
- [ ] Record production apex canonical and www redirect. Handoff audit reports www → apex 308; rerun before release.
- [ ] Confirm PR diff has no credentials, generated output or mail/DNS changes.
- [ ] Obtain explicit owner approval for the exact candidate.

### Approved release and follow-up

- [ ] Merge only after approval; capture resulting production deployment and commit.
- [ ] Repeat read-only checks on production. Use actual verified retired URLs where available; synthetic URLs only prove namespace behavior.
- [ ] Monitor contact-service health and routing; if regression occurs, prepare revert of release commit or prior Vercel deployment for explicit rollback approval.
- [ ] Inspect Search Console status after recrawl; avoid repeated indexing submissions or whole-site removals.

Commands: `NEXT_PUBLIC_SITE_URL=https://thefoleycollective.com pnpm build`, `pnpm typecheck`, `pnpm test`, `pnpm format:check`, `node scripts/verify-vercel-build.mjs`. With the built server running, `node scripts/verify-seo.mjs` checks local retirement. `node scripts/verify-seo.mjs https://thefoleycollective.com --production` checks preserved production pages without asserting undeployed retirement. Run the retirement mode on production only after release. The script sends GET requests only.

## 5. SEO cleanup tracker

| Record                                       | URL or namespace                  | Evidence                                                     | Treatment                               | Current state                                                               |
| -------------------------------------------- | --------------------------------- | ------------------------------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------- |
| Current homepage                             | `https://thefoleycollective.com/` | Live 200 and app-development title/canonical                 | Preserve; allow recrawl                 | Current source verified; old search description remains in retrieved result |
| Current contact / privacy                    | `/contact/`, `/privacy/`          | Live 200 and own canonicals                                  | Preserve                                | Verified                                                                    |
| Current sitemap / robots                     | `/sitemap.xml`, `/robots.txt`     | Live 200                                                     | Preserve                                | Verified endpoints; smoke check validates content                           |
| Historical blog namespace                    | `/c/blog/:path*`                  | Handoff historical prefix, existing approved PR              | 410 + noindex                           | Local build; protected Preview not verified; not deployed                   |
| Cold-wallet article                          | Exact URL unknown                 | Handoff prefix `/c/blog/b/Unlock-the-Power-of-Cold-Wallets…` | Covered if real URL is within namespace | Evidence pending                                                            |
| Advisor vs planner article                   | Exact URL unknown                 | Handoff title                                                | Review complete URL; 410 if obsolete    | Evidence pending                                                            |
| Five safety tips / Unraveling Cryptocurrency | Exact URLs unknown                | Handoff titles                                               | Review complete URLs                    | Evidence pending                                                            |
| CBDCs / Stellar utility projects             | Exact URLs unknown                | Handoff titles                                               | Review complete URLs                    | Evidence pending                                                            |
| Challenge / legacy planning / consulting     | Exact URLs unknown                | Handoff old offers                                           | 410 unless truly relevant replacement   | Evidence pending                                                            |
| Ebook / newsletter / opt-ins                 | Exact URLs unknown                | Handoff old offers                                           | Review assets and routes separately     | Evidence pending                                                            |

No complete extra legacy URL was recovered from this batch's public searches or repository source. The example legacy article is a synthetic fixture, not evidence of a historical article. Do not count successful sitemap submission as indexed pages. No Search Console changes were made.

For each recovered URL, append discovery source/date, exact URL, initial status, every redirect, terminal status, proposed action, replacement (if any), approval, implementation commit and last recrawl evidence. Keep founder biography review separate from obsolete offer retirement.

## 6. Brand and content production calendar

Dates are relative to the approved website release (R), because release and final film availability are not yet established. All content is draft; nothing is scheduled or published.

| Window    | Asset / action                                                 | Channel                                | Acceptance / gate                                          |
| --------- | -------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Before R  | Inventory profiles and old offer links; draft profile refresh  | LinkedIn, Facebook, Instagram, YouTube | Verified account URLs; preserve accounts and history       |
| Before R  | Final film technical review and poster/caption pack            | Website / social                       | Confirm final version, rights, subtitles, aspect ratios    |
| R         | Website smoke audit and owner release decision                 | Website                                | Preview QA and exact SHA approval                          |
| R+1 day   | Approved biographies and launch announcement                   | Business profiles                      | Owner approves specific profile changes and copy           |
| R+3 days  | Founder story: turning useful ideas into working apps          | LinkedIn / Facebook                    | Accurate professional history; no invented results         |
| R+5 days  | 15–30 second film teaser with captions                         | Instagram / YouTube                    | Approved final film and channel export                     |
| R+7 days  | Educational post: what belongs in a first app release?         | LinkedIn / Instagram                   | Practical scope example; concept clearly labeled           |
| R+10 days | Idea-to-app process carousel                                   | Facebook / Instagram                   | Strategy → design → development → launch; approved visuals |
| R+14 days | Invitation to discuss an app idea; review baseline performance | All verified business channels         | CTA to `/contact/`; measure inquiries without promises     |

### Prepared copy for owner review

**Core biography:** The Foley Collective is an independent app-development studio helping founders turn good ideas into practical digital products. We bring strategy, design, development and launch support together. Good ideas. Great apps.

**LinkedIn headline:** Founder, The Foley Collective | App strategy, product design and development | Good ideas. Great apps.

**Instagram biography:** Good ideas. Great apps. / Strategy • Design • Development / Helping founders build practical digital products / Start a conversation ↓

**YouTube description:** Welcome to The Foley Collective. Explore how ideas become useful apps—from choosing a focused first release to thoughtful design, development and launch. Visit thefoleycollective.com to discuss your idea.

**Launch / pinned post:** The Foley Collective is entering a new chapter. We’re bringing strategy, design and development together to help founders turn ideas into practical apps. Our refreshed website introduces how we work and makes it easy to start a conversation. Have an idea you’re ready to explore? Visit https://thefoleycollective.com/contact/. Good ideas. Great apps.

**Visual brief:** Use the current approved website identity and logo. Prepare platform-specific banners, avatars and captioned film exports. Review any coin-style icon for potential legacy-brand confusion before proposing replacements. Do not imply new client work, awards or outcomes without evidence.

**Film integration brief:** Click-to-play section beneath homepage hero; poster shown initially; responsive player; no audio autoplay; defer video bytes until interaction; provide captions and transcript; 1080p web export with confirmed hosting/size. Keep the master and original assets intact. Test keyboard controls, mobile layout, loading cost and contact CTA on a separate branch.

### Next executive report

Report: completed actions, verified checks and candidate SHA; protected Preview and URL-evidence blockers; owner decisions needed only when a concrete candidate is ready. This record is updated during execution sessions and does not imply continuous background operation.

## Execution batch evidence — October 13, 2026

The new smoke check passed against the local production build: current pages/canonicals, exact three sitemap entries, crawlable robots with canonical sitemap, both 410 fixtures with noindex, 308 slash normalization, adjacent 404 boundaries and GET inquiry 405. It also passed against Production in preserved-page mode. TypeScript and Vercel routing-manifest checks passed. Formatting now passes after excluding generated output and the package-manager lockfile and formatting two existing text files. No application delivery code or runtime retirement rule changed.

The deployment must be rechecked after this branch update. Protected Preview QA remains blocked; initial build success and local QA do not establish deployed application behavior.
