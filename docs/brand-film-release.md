# Brand film integration — draft release

## Scope

New development phase authorized by the owner October 14, 2026 (Pacific), after review of the brand-film handoff. Starts from released commit `00305a8`. Session 1's SEO implementation remains unchanged. This branch adds a film section below the capability strip and a hero link to it; the hero headline and contact delivery code are preserved.

The 15-second teaser is deferred. No dedicated `/film` page, social publication, production merge, DNS/email setting, or analytics-provider configuration is included.

## Included assets and behavior

- Desktop 1080p and mobile 720p full films, approximately 29.8 seconds each.
- Silent 13.5-second preview, WebP poster, and English dialogue WebVTT.
- Preview starts only after visibility and reduced-motion preference resolve; pause/resume is available. Reduced motion uses the poster.
- Full film loads on interaction, with native controls, default English captions, chapter buttons, replay, transcript, and contact CTA.
- Full-film source is selected once at initial interaction (720p at widths up to 900px), avoiding mid-playback source changes.
- Playback failures produce visible guidance. Focus moves to the player and replay control.
- Local `foley:film` events expose clicks, playhead-position milestones, and ending. No analytics listener or network transmission is installed. Milestones are not proof of watched time.

The archive master is intentionally excluded from website assets. The optional guide's stale loop/caption/poster names are not used.

## Completed local checks

- `pnpm check`: formatting, TypeScript, all 20 mocked inquiry tests pass.
- `NEXT_PUBLIC_SITE_URL=https://thefoleycollective.com pnpm build`: passes with existing locked dependencies; Next.js 15.5.27.
- `node scripts/verify-vercel-build.mjs`: routing manifest and inquiry endpoint compile checks pass.
- Production-mode local server: current pages/canonicals, sitemap, robots, 410/noindex namespace, neighboring 404 boundary, normalization and GET inquiry 405 pass using `scripts/verify-seo.mjs`.
- All five website assets return 200 with expected video/image/caption content types locally; film section and hero anchor appear in server HTML.
- FFmpeg decodes all three included web videos without reported errors.
- Independent code review addressed preview pause, reduced-motion startup, metadata-aware seeking, focus, source selection and analytics naming.

No real inquiry sent. Automated local browser setup failed to download a usable browser archive; no local interactive browser pass is claimed.

## Preview and approval gates — pending

- [ ] Exact candidate Vercel build and Preview URL verified.
- [ ] Desktop and mobile play with sound, captions and transcript.
- [ ] Preview pause/resume and reduced-motion startup/change work.
- [ ] First-click chapters seek correctly; native-control fallback works.
- [ ] Keyboard focus, replay, mobile layout and no horizontal overflow checked.
- [ ] Mobile first full-film request is 720p; no full-film download before interaction.
- [ ] Contact validation and existing navigation regression checked.
- [ ] Owner accepts dialogue/music balance, synchronization and final end card.
- [ ] Owner explicitly approves exact candidate production promotion.

The package's supplied screenshots and throwaway-copy tests are historical references, not current Preview evidence. Keep the PR draft until remaining checks are resolved or explicitly dispositioned. Preserve deployment protection. Do not infer release approval from approval to develop.

## Rollback

If the owner-approved release regresses, prepare a revert of this integration or restore the preceding deployment for owner approval. Do not alter the released SEO rule or contact credentials as part of rollback.
