import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { privateRoutes } from './lib/privateRoutes';


export async function middleware(request) {
  const path = request.nextUrl.pathname;

  if (privateRoutes.some(route => path.startsWith(route))) {
    const token = request.cookies.get('session_token')?.value;

    if (!token) {
      console.log('No token found, redirecting to login.');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
      await jwtVerify(token, secret);
      console.log('Token verified successfully:');
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/content/:path*'],
};
