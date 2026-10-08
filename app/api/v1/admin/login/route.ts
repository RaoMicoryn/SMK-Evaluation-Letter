import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, isAdminConfigured } from '@/lib/server/auth';
import { loginSchema } from '@/lib/server/admin-validation';
import { jsonError, readJsonBody } from '@/lib/server/http';
import { clearFailures, isBlocked, recordFailure } from '@/lib/server/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const sha = (s: string) => createHash('sha256').update(s).digest();

export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    console.error('[admin/login] ADMIN_PASSWORD / ADMIN_SESSION_SECRET (>=32 karakter) belum diset');
    return jsonError(500, 'Halaman admin belum dikonfigurasi.');
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (isBlocked(ip)) return jsonError(429, 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.');

  const body = await readJsonBody(req);
  if (!body.ok) return jsonError(body.status, body.message);
  const parsed = loginSchema.safeParse(body.data);
  if (!parsed.success) return jsonError(400, parsed.error.issues[0].message);

  // Bandingkan hash (panjang sama) secara constant-time
  const ok = timingSafeEqual(sha(parsed.data.password), sha(process.env.ADMIN_PASSWORD as string));
  if (!ok) {
    recordFailure(ip);
    return jsonError(401, 'Password salah.');
  }
  clearFailures(ip);

  const token = await createSessionToken();
  if (!token) return jsonError(500, 'Halaman admin belum dikonfigurasi.');

  const res = NextResponse.json({ status: 'success' });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
