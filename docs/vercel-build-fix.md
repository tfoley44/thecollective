# Fix for Vercel's missing out/routes-manifest.json error

The supplied Vercel configuration previously forced `outputDirectory` to `out` while selecting the `nextjs` framework preset. This was an error in the handoff configuration. The reported `/vercel/path0/out/routes-manifest.json` path matches that incorrect override.

Next.js produces its routing manifest in `.next/routes-manifest.json`. With this site's `output: "export"`, it additionally generates ready-to-serve HTML, CSS, and JavaScript in `out/`. These folders serve different purposes. Generic static hosting can publish `out/`; Vercel's Next.js build integration must still read the Next.js build artifacts from the framework's default directory.

## Corrected configuration

The updated `vercel.json` no longer defines `outputDirectory`. It retains the Next.js preset, pinned dependency installation, and `pnpm build` command. `next.config.ts` retains `output: "export"`; the website itself does not need to change.

In the Vercel project, select the Next.js Framework Preset and turn the Output Directory Override OFF in Settings → Build and Deployment. Ensure Root Directory points to the folder containing `package.json` and `vercel.json`. Commit the corrected configuration to the repository Vercel actually deploys and deploy its latest commit. A redeployment of the previous failed commit will still use its old configuration. If necessary, redeploy the updated commit without the build cache.

Do not copy a routes manifest into `out`. Do not add Turborepo or NX configuration: neither is used by this project. Do not change the Manus static publish directory from `out`; that is a separate, plain-static hosting configuration.

## Verification boundary

The corrected project was rebuilt locally, type-checked, and checked for `.next/routes-manifest.json` and `out/index.html`. This verifies the source build and directory distinction. No successful Vercel deployment is claimed; a hosted redeployment must be performed in the owner's Vercel account after its project settings are corrected.

## Reference

[1]: https://vercel.com/docs/builds/configure-a-build "Vercel: Configuring a build and framework output-directory defaults"

Vercel documents automatic framework output-directory selection and the separate ability to override it in the dashboard or `vercel.json`. [1]
