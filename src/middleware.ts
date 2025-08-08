import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  console.log('Middleware running for:', pathname);
  console.log('JWT_SECRET available:', !!process.env.JWT_SECRET);

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/quiz', '/play', '/history', '/statistics'];
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  console.log('Is protected route:', isProtectedRoute);

  if (isProtectedRoute) {
    // Get the auth token from cookies
    const token = request.cookies.get('auth-token')?.value;
    
    console.log('Token found:', !!token);
    
    if (!token) {
      console.log('No token, redirecting to auth');
      // Redirect to auth page if no token
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Verify the token
    const user = verifyToken(token);
    
    console.log('Token valid:', !!user);
    
    if (!user) {
      console.log('Invalid token, redirecting to auth');
      // Redirect to auth page if token is invalid
      const response = NextResponse.redirect(new URL('/auth', request.url));
      // Clear the invalid token
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // If user is authenticated and tries to access auth page, redirect to dashboard
  if (pathname === '/auth') {
    const token = request.cookies.get('auth-token')?.value;
    
    console.log('Auth page access, token found:', !!token);
    
    if (token) {
      const user = verifyToken(token);
      console.log('Auth page access, token valid:', !!user);
      if (user) {
        console.log('Redirecting from auth to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  console.log('Middleware allowing request to continue');
  return NextResponse.next();
}

export const config = {
  matcher: []
};
