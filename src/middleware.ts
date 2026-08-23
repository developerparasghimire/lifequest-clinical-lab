import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/questlife-admin");
  const isLoginPage = pathname === "/questlife-admin/login";
  const isApiAuthRoute = pathname.startsWith("/api/auth");

  if (isApiAuthRoute) return NextResponse.next();

  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/questlife-admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute && !isLoggedIn) {
    const loginUrl = new URL("/questlife-admin/login", req.nextUrl);
    // Preserve the originally requested path so we can redirect back after login.
    if (pathname !== "/questlife-admin/login") {
      loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/questlife-admin/:path*", "/api/questlife-admin/:path*"],
};
