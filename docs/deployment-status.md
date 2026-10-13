> Historical V2 deployment note. V3 website-sent inquiries use normal Next.js server hosting, not static export. Follow `website-email-setup.md` and the current README for deployment.

# Deployment status

On October 12, 2026, the owner confirmed that the V2 source deployed successfully on Vercel.

The working source explicitly sets `outputDirectory: ".next"` in `vercel.json` and `distDir: ".next"` in `next.config.ts`, and includes `scripts/verify-vercel-build.mjs` in the Vercel build command. The site retains its static-export configuration, approved coin favicon, and company email `contact@thefoleycollective.com`.

This success is owner-reported. The deployment URL, custom-domain connection, preferred-domain redirect, and live-site behavior have not been independently checked in this session. Do not infer a DNS cutover or domain connection from build success alone.
