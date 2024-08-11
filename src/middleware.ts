import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //this logic handles the 2 different logins (login to an event or login to MyEvent tools to create your own event)

  if (session) {
    // If the user is authenticated, continue as normal
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  const url = req.nextUrl.clone();
  const slug = url.searchParams.get("slug");

  url.pathname = slug ? `/auth/login/event/${slug}` : "/auth/login";
  url.search = "";

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/event/(.*)/cart",
    "/event/(.*)/profile",
    "/admin-settings/permissions",
    "/dashboard/:path*",
    "/admin-settings/add-discos",
  ],
};
