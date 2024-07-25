import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const serialized = serialize('session_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  const response = NextResponse.json({ success: true });
  response.headers.set('Set-Cookie', serialized);
  return response;
}