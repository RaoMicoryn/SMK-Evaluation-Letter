import { NextResponse } from 'next/server';
import { EVALUATION_CATEGORIES } from '@/lib/server/categories';

export const runtime = 'nodejs';

// GET /api/v1/evaluations/categories
export async function GET() {
  return NextResponse.json(
    { status: 'success', data: EVALUATION_CATEGORIES },
    { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
  );
}
