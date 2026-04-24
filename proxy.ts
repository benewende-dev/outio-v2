import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/pricing", "/contact", "/about", "/blog"];
const AUTH_ROUTES   = ["/login", "/register", "/forgot-password"];
const ADMIN_ROUTES  = ["/admin"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn   = !!req.auth;
  const userRole     = (req.auth?.user as any)?.role;

  // Admin protection
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn || !["admin", "super_admin"].includes(userRole)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Dashboard protection
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect logged-in users away from auth pages
  if (AUTH_ROUTES.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
