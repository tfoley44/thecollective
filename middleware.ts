import { NextResponse, type NextRequest } from "next/server";

/**
 * Retire the old external-site blog namespace. These posts do not have
 * equivalent pages in the current app-development website, so a 410 is
 * preferable to an unrelated redirect to the homepage.
 */
export function middleware(_request: NextRequest) {
  return new NextResponse("This legacy article has been retired.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex",
    },
  });
}

export const config = {
  matcher: ["/c/blog/:path*"],
};
