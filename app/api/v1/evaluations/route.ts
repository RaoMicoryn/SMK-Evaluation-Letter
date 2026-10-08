import { NextResponse } from 'next/server';
import { prisma } from '@/lib/server/db';
import { jsonError, readJsonBody } from '@/lib/server/http';
import { createEvaluationSchema, toFieldErrors } from '@/lib/server/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/v1/evaluations
export async function POST(req: Request) {
  const body = await readJsonBody(req);
  if (!body.ok) return jsonError(body.status, body.message);

  const parsed = createEvaluationSchema.safeParse(body.data);
  if (!parsed.success) {
    const errors = toFieldErrors(parsed.error);
    return jsonError(400, errors[0].message, errors); // message = error pertama (dipakai toast di UI)
  }

  try {
    const row = await prisma.evaluation.create({
      data: parsed.data,
      select: { id: true, createdAt: true },
    });
    return NextResponse.json(
      { status: 'success', data: { id: row.id, created_at: row.createdAt.toISOString() } },
      { status: 201 },
    );
  } catch (err) {
    console.error('[POST /api/v1/evaluations]', err); // detail hanya di log server
    return jsonError(500, 'Terjadi gangguan pada server. Coba lagi nanti.');
  }
}
