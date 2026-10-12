import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return ["/", "/contact/", "/privacy/"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.5,
  }));
}
