import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    console.log(url);

    url.pathname = url.pathname == "/" ? `/auth/login` : `/auth/login/${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/disco/:path*", "/profile", "/admin-settings/permissions", "/admin-settings/add-discos"],
};
