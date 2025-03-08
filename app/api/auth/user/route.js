import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  const token = request.cookies.get('session_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const decoded = verify(token, process.env.SESSION_SECRET);
    return NextResponse.json({ authenticated: true, username: decoded.username });
  } catch (error) {
    return NextResponse.json({ authenticated: false });
  }
}