import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import { authConfig } from '@/auth.config';

// Lightweight auth instance for the proxy: uses the edge-safe config only
// (no Prisma adapter). The JWT session is verified from the request cookie.
const { auth } = NextAuth(authConfig);

export const proxy = auth((request) => {
  const isLoggedIn = Boolean(request.auth);
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL('/sign-in', request.nextUrl.origin);
    const callbackPath =
      request.nextUrl.pathname + request.nextUrl.search;
    signInUrl.searchParams.set('callbackUrl', callbackPath);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*'],
};
