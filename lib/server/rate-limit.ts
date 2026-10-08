// Pembatas percobaan login sederhana (in-memory, per instance).
// Cukup menahan tebak-tebakan kasar; di serverless tiap instance punya hitungan sendiri.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;
const fails = new Map<string, { count: number; resetAt: number }>();

export function isBlocked(key: string): boolean {
  const e = fails.get(key);
  if (!e) return false;
  if (e.resetAt < Date.now()) {
    fails.delete(key);
    return false;
  }
  return e.count >= MAX_FAILS;
}

export function recordFailure(key: string) {
  const now = Date.now();
  const e = fails.get(key);
  if (!e || e.resetAt < now) fails.set(key, { count: 1, resetAt: now + WINDOW_MS });
  else e.count++;
  if (fails.size > 1000) for (const [k, v] of fails) if (v.resetAt < now) fails.delete(k);
}

export function clearFailures(key: string) {
  fails.delete(key);
}
