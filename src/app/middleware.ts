import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Jika tidak ada token, redirect ke /login
  if (!token && ["/", "/home"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika ada token dan mencoba mengakses /login, redirect ke /home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/home"], // Tambahkan /home
};
