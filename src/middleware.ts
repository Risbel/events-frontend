import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    console.log(url);

    url.pathname =
      url.pathname == "/dashboard" || url.pathname == "/dashboard/allevents" || url.pathname == "/dashboard/workspace"
        ? `/auth/login`
        : `auth/login/${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/event/:path*",
    "/profile",
    "/admin-settings/permissions",
    "/dashboard/:path*",
    "/admin-settings/add-discos",
  ],
};
