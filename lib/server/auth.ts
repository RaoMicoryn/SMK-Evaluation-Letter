// Dipakai di middleware (Edge) DAN route handler (Node) -> hanya Web Crypto, tanpa modul node:*.
export const SESSION_COOKIE = 'ke_admin';
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 jam

const enc = new TextEncoder();

/** Secret wajib >= 32 karakter; kalau tidak, semua sesi dianggap tidak valid (fail closed). */
function getSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && getSecret() !== null;
}

const toB64Url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const fromB64Url = (s: string) =>
  Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));

const hmacKey = (secret: string) =>
  crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

/** Token = "<exp>.<signature>"; exp dalam detik epoch. */
export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload = `v1.${Math.floor(Date.now() / 1000) + SESSION_MAX_AGE}`;
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(payload));
  return `${payload}.${toB64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;
  try {
    const [v, exp, sig] = token.split('.');
    if (v !== 'v1' || !exp || !sig) return false;
    if (!(Number(exp) > Math.floor(Date.now() / 1000))) return false;
    // crypto.subtle.verify membandingkan tanda tangan secara constant-time
    return await crypto.subtle.verify('HMAC', await hmacKey(secret), fromB64Url(sig), enc.encode(`${v}.${exp}`));
  } catch {
    return false;
  }
}
