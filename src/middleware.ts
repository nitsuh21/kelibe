import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN_KEY } from './services/api/tokens';

const publicPaths = ['/','/auth/signin', '/auth/signup', '/auth/verify'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN_KEY);
  const currentPath = request.nextUrl.pathname;

  

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => currentPath.startsWith(path));

  // If path is public and user is logged in, redirect to explore
  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL('/profile', request.url));
  // }

  // If path is protected and user is not logged in, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
