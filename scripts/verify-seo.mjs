import assert from "node:assert/strict";

// Read-only smoke checks. Never submit an inquiry or bypass Preview protection.
const base = new URL(process.argv[2] ?? "http://localhost:3000");
const canonical = "https://thefoleycollective.com";
const production = process.argv.includes("--production");

async function request(path) {
  const result = await fetch(new URL(path, base), {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  if (result.headers.get("location")?.includes("vercel.com/sso")) {
    throw new Error("Preview requires authentication; application not tested.");
  }
  return result;
}

for (const path of ["/", "/contact/", "/privacy/"]) {
  const response = await request(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const expected = `${canonical}${path}`;
  assert.ok(
    html.includes(`rel="canonical" href="${expected}"`),
    `Missing canonical: ${expected}`,
  );
  assert.ok(!/crypto and gold investment/i.test(html), "Retired brand copy");
  console.log(`PASS ${path}: 200 and canonical`);
}
const sitemap = await request("/sitemap.xml");
assert.equal(sitemap.status, 200);
const locations = [
  ...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g),
].map((match) => match[1]);
assert.deepEqual(
  locations.sort(),
  ["/", "/contact/", "/privacy/"].map((path) => `${canonical}${path}`).sort(),
);
const robots = await request("/robots.txt");
assert.equal(robots.status, 200);
const rules = await robots.text();
assert.ok(rules.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert.ok(!/^Disallow:\s*\/\s*$/m.test(rules), "Current site blocks crawling");
console.log("PASS sitemap and robots");

if (!production) {
  for (const path of ["/c/blog/", "/c/blog/b/example-legacy-article/"]) {
    const response = await request(path);
    assert.equal(response.status, 410, path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex");
    console.log(`PASS ${path}: 410 and noindex`);
  }
  const normalized = await request("/c/blog/b/example-legacy-article");
  assert.equal(normalized.status, 308);
  assert.equal(
    new URL(normalized.headers.get("location"), base).pathname,
    "/c/blog/b/example-legacy-article/",
  );
  for (const path of ["/c/", "/c/blogger/"]) {
    assert.equal((await request(path)).status, 404, path);
  }
  console.log("PASS retirement boundary and slash normalization");
}
assert.equal((await request("/api/inquiries/")).status, 405);
console.log("PASS inquiry endpoint is preserved (GET only; no email sent)");
