import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
if (config.framework !== "nextjs" || config.outputDirectory !== ".next") {
  throw new Error(
    "Deploy the current vercel.json with framework=nextjs and outputDirectory=.next.",
  );
}
const manifest = join(root, ".next", "routes-manifest.json");
if (!existsSync(manifest))
  throw new Error("Next.js did not produce .next/routes-manifest.json.");
JSON.parse(readFileSync(manifest, "utf8"));
const paths = JSON.parse(
  readFileSync(
    join(root, ".next", "server", "app-paths-manifest.json"),
    "utf8",
  ),
);
if (!paths["/api/inquiries/route"])
  throw new Error("The server-side inquiry route was not compiled.");
console.log(
  "FOLEY_VERCEL_FIX_V2: outputDirectory=.next; routing manifest verified.",
);
console.log(
  "FOLEY_WEBSITE_EMAIL_V3: server-side inquiry endpoint compiled; runtime email credentials required.",
);
