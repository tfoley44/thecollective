import type { Metadata } from "next";
import { Header, Footer } from "../components/site-shell";
import "./globals.css";

const origin = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(origin
    ? { metadataBase: new URL(origin), alternates: { canonical: "/" } }
    : {}),
  title: {
    default: "The Foley Collective | Thoughtful App Development",
    template: "%s | The Foley Collective",
  },
  description:
    "Turn your app idea into a thoughtful digital product. The Foley Collective brings strategy, design, development, and launch support together.",
  keywords: [
    "app development",
    "product design",
    "mobile apps",
    "web applications",
    "MVP development",
  ],
  openGraph: {
    title: "Good ideas. Great apps. | The Foley Collective",
    description:
      "An independent app-development studio. Thoughtful strategy, considered design, and apps built for the people who use them.",
    siteName: "The Foley Collective",
    type: "website",
    ...(origin
      ? {
          url: origin,
          images: [
            {
              url: `${origin}/brand/foley-logo.png`,
              width: 1000,
              height: 394,
              alt: "The Foley Collective",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary",
    title: "The Foley Collective | Thoughtful App Development",
    description:
      "Good ideas deserve great apps. Strategy, design, development, and launch support.",
    ...(origin ? { images: [`${origin}/brand/foley-logo.png`] } : {}),
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=coin-1",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      { url: "/brand/favicon-coin-32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/brand/favicon-coin-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico?v=coin-1",
    apple: {
      url: "/brand/apple-touch-icon-coin.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
