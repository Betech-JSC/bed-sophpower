import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "@/lib/api";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next();

  try {
    // Fetch active redirects list from CMS backend
    const redirects = await api.getRedirects();
    
    // Find if the current pathname matches a source_url
    const match = redirects.find(
      (r) => r.source_url === pathname || r.source_url === pathname + "/"
    );

    if (match) {
      // Perform 301 (Permanent) or 302 (Temporary) redirect
      const redirectUrl = new URL(match.target_url, request.url);
      response = NextResponse.redirect(redirectUrl, match.http_code);
    }
  } catch (error) {
    console.error("SEO Redirect middleware error:", error);
  }

  // Prevent browser and proxy caching to ensure CMS updates are immediately visible
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
