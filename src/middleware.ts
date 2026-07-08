import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const protectedPrefixes = ["/dashboard", "/scan"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(env.FIREBASE_SESSION_COOKIE_NAME);
  if (!hasSession) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/scan/:path*"]
};