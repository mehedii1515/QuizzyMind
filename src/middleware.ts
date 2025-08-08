import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Redirect NextAuth default pages to custom auth page
    if (req.nextUrl.pathname.startsWith('/auth/signin') || 
        req.nextUrl.pathname.startsWith('/auth/signup') || 
        req.nextUrl.pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
    
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/quiz/:path*",
    "/play/:path*",
    "/history/:path*",
    "/statistics/:path*",
    "/auth/signin",
    "/auth/signup", 
    "/auth/login"
  ],
};
