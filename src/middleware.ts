import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (session) {
    // If the user is authenticated, continue as normal
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the login page
  const loginUrl = new URL("/auth/login", req.url);
  // Add the original URL as a query parameter for redirection after login
  loginUrl.searchParams.set("redirect", req.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin-settings/permissions", "/dashboard/:path*", "/admin-settings/add-discos"],
};
