import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const image = origin
    ? [
        {
          url: `${origin}/brand/foley-logo.png`,
          width: 1000,
          height: 394,
          alt: "The Foley Collective",
        },
      ]
    : undefined;
  return {
    title,
    description,
    ...(origin ? { alternates: { canonical: `${origin}${path}` } } : {}),
    openGraph: {
      title: `${title} | The Foley Collective`,
      description,
      siteName: "The Foley Collective",
      type: "website",
      ...(origin ? { url: `${origin}${path}`, images: image } : {}),
    },
    twitter: {
      card: "summary",
      title: `${title} | The Foley Collective`,
      description,
      ...(origin ? { images: [`${origin}/brand/foley-logo.png`] } : {}),
    },
  };
}
