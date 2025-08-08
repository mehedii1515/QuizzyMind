import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Block all NextAuth automatic pages and redirect to our custom auth page
  if (pathname.startsWith('/api/auth/signin') || 
      pathname.startsWith('/api/auth/signup') ||
      pathname.startsWith('/auth/signin') || 
      pathname.startsWith('/auth/signup') || 
      pathname.startsWith('/auth/login') ||
      pathname.startsWith('/auth/error')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  
  // Protect authenticated routes
  const protectedPaths = ['/dashboard', '/quiz', '/play', '/history', '/statistics'];
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    // Let NextAuth handle authentication for protected routes
    const token = request.cookies.get('next-auth.session-token');
    if (!token) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/auth/signin',
    '/api/auth/signup',
    '/auth/signin',
    '/auth/signup', 
    '/auth/login',
    '/auth/error',
    '/dashboard/:path*',
    '/quiz/:path*',
    '/play/:path*',
    '/history/:path*',
    '/statistics/:path*',
  ],
};
