import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/server/auth';

const PUBLIC_PATHS = ['/admin/login', '/api/v1/admin/login', '/api/v1/admin/logout'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const loggedIn = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);

  if (PUBLIC_PATHS.includes(pathname)) {
    if (pathname === '/admin/login' && loggedIn) return NextResponse.redirect(new URL('/admin', req.url));
    return NextResponse.next();
  }
  if (loggedIn) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ status: 'error', message: 'Belum login.' }, { status: 401 });
  }
  const url = new URL('/admin/login', req.url);
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/admin/:path*', '/api/v1/admin/:path*'] };
