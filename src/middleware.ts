// <root>/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { routes } from './config/routes';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  // console.log(token);
  // if (request.nextUrl.pathname === routes.protected.Logout) {
  //   if (token) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  // }
  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (token) return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // This logic is only applied to /dashboard
    if (!token)
      return NextResponse.redirect(new URL('/', request.url));
  }
  NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
