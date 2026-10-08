import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const res = NextResponse.json({ status: 'success' });
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}
