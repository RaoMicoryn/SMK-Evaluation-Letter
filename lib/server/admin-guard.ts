import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from './auth';

/** Lapis kedua di route handler (lapis pertama: middleware.ts). */
export async function isAuthenticated(): Promise<boolean> {
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
}
