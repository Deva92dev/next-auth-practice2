import { NextRequest, NextResponse } from 'next/server';

// 2part function, 1st part logic part
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath = path === '/login' || path === '/signup';
  // now get the token from cookies
  const token = request.cookies.get('token')?.value || '';

  if (publicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// 2nd part matching paths part
export const config = {
  matcher: ['/', '/login', '/signup', '/(profile|profile/.*)'],
};
