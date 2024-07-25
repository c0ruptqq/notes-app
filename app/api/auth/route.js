import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(request) {
  const { username, password } = await request.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.SESSION_SECRET,
      { expiresIn: '1h' }
    );

    const serialized = serialize('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', serialized);
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}