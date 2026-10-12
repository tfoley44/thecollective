# V2 fix: Vercel's out/routes-manifest.json error

The first bundle set `outputDirectory` to `out`. The first correction removed that field, but omission can leave a project-level `out` override effective. The repeated error still shows Vercel looking in `out`, so V2 makes the build-directory choice explicit in source instead of relying on a dashboard change. The deployed repository and dashboard are not connected to this session, so their current settings and commit cannot be directly confirmed.

## Files changed

`vercel.json` now defines `framework: "nextjs"`, `outputDirectory: ".next"`, and the build command `pnpm build && node scripts/verify-vercel-build.mjs`. The file-level output setting takes precedence over the Vercel dashboard output setting.

`next.config.ts` now explicitly defines `distDir: ".next"`. It keeps `output: "export"`: Next.js build artifacts and the routing manifest remain in `.next`, while ready-to-serve static files are generated in `out`.

`scripts/verify-vercel-build.mjs` checks the effective source configuration, parses `.next/routes-manifest.json`, and verifies `out/index.html`. Success prints this identifying line:

```text
FOLEY_VERCEL_FIX_V2: outputDirectory=.next; routing manifest verified.
```

## Deploy the changed source

The `foley-vercel-fixed-v2.zip` package contains `package.json`, `vercel.json`, `next.config.ts`, and `scripts/` at the ZIP root. Extract it into the actual repository folder configured as Vercel's Root Directory. Preserve unrelated user files. Commit the changes and deploy that new commit, not an earlier failed deployment's commit.

Use the Next.js framework preset. The bundled file-level settings handle the output-directory and build-command overrides. Do not set Next.js `distDir` to `out`, copy manifests into `out`, or add Turborepo/NX configuration; this project does not use either tool.

If a deployment continues to mention `/out/routes-manifest.json` and its log does not show the V2 marker, these V2 files are not being read by that deployment. Check its source commit and Root Directory. A successful build of this exact V2 configuration uses `.next` for the Next.js manifest directory.

## Verification boundary

The V2 build command and TypeScript checks are run locally, and the source package is checked for the explicit settings and required verification script. This does not establish successful deployment in the owner's Vercel account. No live-domain, DNS, hosting-account, or mailbox change is made by this source correction. The Manus static publication directory remains `out`, because it serves plain exported files rather than using the Vercel Next.js adapter.

## References

[1]: https://vercel.com/docs/project-configuration/vercel-json "Vercel: Static configuration and outputDirectory precedence"
[2]: https://vercel.com/docs/builds/configure-a-build "Vercel: Framework build settings and Root Directory"

Vercel documents that `outputDirectory` in `vercel.json` overrides the project's dashboard setting. [1] The build Root Directory determines which application folder is deployed. [2]
