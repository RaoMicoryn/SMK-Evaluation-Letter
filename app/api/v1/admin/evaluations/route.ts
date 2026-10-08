import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/server/db';
import { isAuthenticated } from '@/lib/server/admin-guard';
import { jsonError } from '@/lib/server/http';
import { listQuerySchema } from '@/lib/server/admin-validation';
import { serializeEvaluation } from '@/lib/server/serialize';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/v1/admin/evaluations?page&pageSize&category&rating&status&hidden&q&from&to
export async function GET(req: Request) {
  if (!(await isAuthenticated())) return jsonError(401, 'Belum login.');

  const parsed = listQuerySchema.safeParse(Object.fromEntries(new URL(req.url).searchParams));
  if (!parsed.success) return jsonError(400, parsed.error.issues[0].message);
  const q = parsed.data;

  // Tanggal dianggap zona WIB (UTC+7), sesuai pengguna sekolah.
  const createdAt: Prisma.DateTimeFilter = {};
  if (q.from) createdAt.gte = new Date(`${q.from}T00:00:00+07:00`);
  if (q.to) createdAt.lte = new Date(`${q.to}T23:59:59.999+07:00`);

  const where: Prisma.EvaluationWhereInput = {
    ...(q.category ? { category: q.category } : {}),
    ...(q.rating ? { rating: q.rating } : {}),
    ...(q.status ? { status: q.status } : {}),
    ...(q.hidden === 'visible' ? { hiddenAt: null } : {}),
    ...(q.hidden === 'hidden' ? { hiddenAt: { not: null } } : {}),
    ...(q.from || q.to ? { createdAt } : {}),
    ...(q.q
      ? {
          OR: [
            { positiveFeedback: { contains: q.q, mode: 'insensitive' as const } },
            { improvementsNeeded: { contains: q.q, mode: 'insensitive' as const } },
            { reporterName: { contains: q.q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  try {
    const [items, total, cats] = await prisma.$transaction([
      prisma.evaluation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (q.page - 1) * q.pageSize,
        take: q.pageSize,
      }),
      prisma.evaluation.count({ where }),
      prisma.evaluation.groupBy({ by: ['category'], orderBy: { category: 'asc' } }),
    ]);

    return NextResponse.json({
      status: 'success',
      data: {
        items: items.map(serializeEvaluation),
        total,
        page: q.page,
        page_size: q.pageSize,
        categories: cats.map((c: { category: string }) => c.category), // untuk opsi filter, selalu sesuai isi data
      },
    });
  } catch (err) {
    console.error('[GET /api/v1/admin/evaluations]', err);
    return jsonError(500, 'Terjadi gangguan pada server.');
  }
}
