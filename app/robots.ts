import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return origin
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${origin}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
