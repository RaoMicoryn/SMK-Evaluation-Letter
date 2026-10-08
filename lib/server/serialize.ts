import type { Evaluation } from '@prisma/client';

export function serializeEvaluation(e: Evaluation) {
  return {
    id: e.id,
    category: e.category,
    rating: e.rating,
    positive_feedback: e.positiveFeedback,
    improvements_needed: e.improvementsNeeded,
    is_anonymous: e.isAnonymous,
    reporter_name: e.reporterName,
    status: e.status,
    internal_note: e.internalNote,
    hidden_at: e.hiddenAt?.toISOString() ?? null,
    created_at: e.createdAt.toISOString(),
    updated_at: e.updatedAt.toISOString(),
  };
}
