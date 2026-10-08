import { NextResponse } from 'next/server';
import type { FieldError } from './validation';

export function jsonError(status: number, message: string, errors?: FieldError[]) {
  return NextResponse.json({ status: 'error', message, ...(errors ? { errors } : {}) }, { status });
}

const MAX_BODY_BYTES = 10 * 1024; // payload sah paling banyak ~1.5 KB; 10 KB sudah longgar

export type JsonBodyResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; message: string };

/** Baca body sebagai JSON object. Menolak body kosong, terlalu besar, JSON rusak, atau bukan object. */
export async function readJsonBody(req: Request): Promise<JsonBodyResult> {
  const declared = Number(req.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return { ok: false, status: 413, message: 'Payload terlalu besar.' };

  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, status: 400, message: 'Body request tidak dapat dibaca.' };
  }
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) {
    return { ok: false, status: 413, message: 'Payload terlalu besar.' };
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, status: 400, message: 'Body harus berupa JSON yang valid.' };
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return { ok: false, status: 400, message: 'Body harus berupa JSON object.' };
  }
  return { ok: true, data };
}
