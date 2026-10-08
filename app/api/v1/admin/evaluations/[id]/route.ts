import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/server/db';
import { isAuthenticated } from '@/lib/server/admin-guard';
import { jsonError, readJsonBody } from '@/lib/server/http';
import { idSchema, updateSchema } from '@/lib/server/admin-validation';
import { serializeEvaluation } from '@/lib/server/serialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: { id: string } };

const isNotFound = (e: unknown) => e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025';

// PATCH: ubah status / catatan internal / sembunyikan-tampilkan. Isi masukan siswa TIDAK bisa diubah.
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) return jsonError(401, 'Belum login.');
  const id = idSchema.safeParse(params.id);
  if (!id.success) return jsonError(400, id.error.issues[0].message);

  const body = await readJsonBody(req);
  if (!body.ok) return jsonError(body.status, body.message);
  const parsed = updateSchema.safeParse(body.data);
  if (!parsed.success) return jsonError(400, parsed.error.issues[0].message);
  const d = parsed.data;

  try {
    const row = await prisma.evaluation.update({
      where: { id: id.data },
      data: {
        ...(d.status !== undefined ? { status: d.status } : {}),
        ...(d.internal_note !== undefined ? { internalNote: d.internal_note } : {}),
        ...(d.hidden !== undefined ? { hiddenAt: d.hidden ? new Date() : null } : {}),
      },
    });
    return NextResponse.json({ status: 'success', data: serializeEvaluation(row) });
  } catch (err) {
    if (isNotFound(err)) return jsonError(404, 'Evaluasi tidak ditemukan.');
    console.error('[PATCH /api/v1/admin/evaluations/:id]', err);
    return jsonError(500, 'Terjadi gangguan pada server.');
  }
}

// DELETE: hapus permanen.
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAuthenticated())) return jsonError(401, 'Belum login.');
  const id = idSchema.safeParse(params.id);
  if (!id.success) return jsonError(400, id.error.issues[0].message);

  try {
    await prisma.evaluation.delete({ where: { id: id.data } });
    return NextResponse.json({ status: 'success' });
  } catch (err) {
    if (isNotFound(err)) return jsonError(404, 'Evaluasi tidak ditemukan.');
    console.error('[DELETE /api/v1/admin/evaluations/:id]', err);
    return jsonError(500, 'Terjadi gangguan pada server.');
  }
}
