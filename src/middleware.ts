// <root>/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { routes } from './config/routes';


export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const user = request.cookies.get('user_role')?.value;

  // console.log(
  //   'pppppppppppppppaaaaaaaaaaaaaaaaaattttttttttttttttttthhhhhhhhhhhhhhhhh',
  //   user
  // );

  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (token) {
      if (request.nextUrl.pathname === routes.protected.Logout) {
        return NextResponse.next();
      } else if (user === 'ADMIN') {
        return NextResponse.redirect(
          new URL(routes.private.Admin, request.url)
        );
      } else if (request.nextUrl.href.includes('checkout=pending')) {
        return NextResponse.redirect(
          new URL(routes.public.Checkout, request.url)
        );
      } else {
        return NextResponse.redirect(new URL(routes.public.Home, request.url));
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    //
    if (!token) {
      return NextResponse.redirect(
        new URL(routes.protected.Login, request.url)
      );
    } else {
      if (user !== 'ADMIN') {
        return NextResponse.redirect(new URL(routes.public.Home, request.url));
      }
    }
  }
  if (request.nextUrl.pathname.startsWith('/checkout')) {
    // وقتی که کاربر لاگین نکرده باشد به صفحه لاگین هدایت می شود
    if (!token) {
      return NextResponse.redirect(
        new URL(routes.protected.Login + '?checkout=pending', request.url)
      );
    }
  }
  NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/checkout/:path*'],
};
