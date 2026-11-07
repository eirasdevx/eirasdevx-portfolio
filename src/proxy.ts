import { NextResponse, type NextRequest } from "next/server";

/**
 * Spanish is served from unprefixed URLs: "/apps" is rewritten internally to
 * "/es/apps", while English keeps its "/en" prefix. "/es/…" redirects to the
 * clean URL so every page has a single canonical address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  // Generated metadata images (opengraph-image…) are linked with their real path.
  if (pathname.endsWith("-image")) return;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (images, icons, sitemap.xml…).
  matcher: ["/((?!_next/|.*\\.[^/]+$).*)"],
};
