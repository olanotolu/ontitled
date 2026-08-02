import { auth0 } from "./lib/auth0";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth0 only for product routes. Marketing HTML (/index, /, /dyson, …)
 * must not run auth middleware — it breaks hard-refresh on static pages.
 */
const AUTH_MATCHERS = [
  /^\/dashboard(?:\/|$)/,
  /^\/playground(?:\/|$)/,
  /^\/settings(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/signup(?:\/|$)/,
  /^\/app(?:\/|$)/,
  /^\/api(?:\/|$)/,
  /^\/auth(?:\/|$)/,
  /^\/logout(?:\/|$)/, // alias → /auth/logout (also match if hit directly)
  /^\/authorize(?:\/|$)/,
  /^\/access-token(?:\/|$)/,
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static marketing assets / pages — pass through
  if (
    pathname.startsWith("/contra-assets") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/marketing") ||
    pathname.endsWith(".html") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".woff2") ||
    pathname === "/" ||
    pathname === "/index" ||
    pathname.startsWith("/index/") ||
    pathname === "/dyson" ||
    pathname === "/themis" ||
    pathname === "/company" ||
    pathname === "/our-thesis" ||
    pathname === "/research" ||
    pathname.startsWith("/research/") ||
    pathname === "/dike" ||
    pathname.startsWith("/dike/") ||
    pathname === "/jobs" ||
    pathname.startsWith("/jobs/") ||
    pathname === "/vision" ||
    pathname.startsWith("/creative-arena")
  ) {
    return NextResponse.next();
  }

  const needsAuth = AUTH_MATCHERS.some((re) => re.test(pathname));
  if (!needsAuth) {
    return NextResponse.next();
  }

  return auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
