import type { NextRequest } from "next/server";
import { JWT_COOKIE } from "./app/auth/auth";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(JWT_COOKIE)?.value;

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
