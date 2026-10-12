import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));

if (config.framework !== "nextjs" || config.outputDirectory !== ".next") {
  throw new Error(
    "Foley deployment configuration is stale. Deploy the V2 vercel.json with framework=nextjs and outputDirectory=.next.",
  );
}

const manifestPath = join(root, ".next", "routes-manifest.json");
if (!existsSync(manifestPath)) {
  throw new Error(
    "Next.js did not produce .next/routes-manifest.json. Review the next build errors; do not use out as the Next.js build directory.",
  );
}
JSON.parse(readFileSync(manifestPath, "utf8"));

if (!existsSync(join(root, "out", "index.html"))) {
  throw new Error("The static export is missing out/index.html.");
}

console.log("FOLEY_VERCEL_FIX_V2: outputDirectory=.next; routing manifest verified.");
console.log("Static export verified separately at out/index.html.");
