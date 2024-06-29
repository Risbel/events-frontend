import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  //this logic handles the 2 different logins (login to an event or login to MyEvent tools to create your own event)
  if (!session) {
    const url = req.nextUrl.clone();

    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = `/auth/login`;
    } else {
      url.pathname = `auth/login${url.pathname}`;
    }

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
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
