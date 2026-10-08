import { z, type ZodError } from 'zod';

export const LIMITS = { category: 50, feedback: 500, name: 100 } as const;

// Hitung per karakter (code point), bukan per UTF-16 unit, supaya emoji dihitung 1.
const len = (s: string) => Array.from(s).length;
// Postgres menolak \u0000 di kolom text -> akan jadi 500 kalau lolos.
const hasNul = (s: string) => s.includes('\u0000');

/** Teks opsional: undefined / null / "" / spasi saja -> null. */
const optionalText = (field: string) =>
  z
    .string({ invalid_type_error: `${field} harus berupa string atau null` })
    .nullable()
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : null;
    })
    .superRefine((v, ctx) => {
      if (v === null) return;
      if (len(v) > LIMITS.feedback) {
        ctx.addIssue({ code: 'custom', message: `${field} maksimal ${LIMITS.feedback} karakter` });
      } else if (hasNul(v)) {
        ctx.addIssue({ code: 'custom', message: `${field} mengandung karakter tidak valid` });
      }
    });

export const createEvaluationSchema = z
  .object({
    category: z
      .string({ required_error: 'category wajib diisi', invalid_type_error: 'category harus berupa string' })
      .trim()
      .min(1, 'category wajib diisi')
      .max(LIMITS.category, `category maksimal ${LIMITS.category} karakter`)
      .refine((v) => !hasNul(v), 'category mengandung karakter tidak valid'),

    rating: z
      .number({ required_error: 'rating wajib diisi', invalid_type_error: 'rating harus berupa integer' })
      .int('rating harus berupa bilangan bulat')
      .min(1, 'rating minimal 1')
      .max(5, 'rating maksimal 5'),

    positive_feedback: optionalText('positive_feedback'),
    improvements_needed: optionalText('improvements_needed'),

    is_anonymous: z.boolean({
      required_error: 'is_anonymous wajib diisi',
      invalid_type_error: 'is_anonymous harus berupa boolean',
    }),

    reporter_name: z
      .string({ invalid_type_error: 'reporter_name harus berupa string atau null' })
      .nullable()
      .optional(),
  })
  .strict() // field di luar kontrak ditolak
  .superRefine((d, ctx) => {
    const issue = (message: string) => ctx.addIssue({ code: 'custom', path: ['reporter_name'], message });
    const name = d.reporter_name;

    if (d.is_anonymous) {
      if (name !== null && name !== undefined) issue('reporter_name harus null jika is_anonymous bernilai true');
      return;
    }
    const trimmed = name?.trim() ?? '';
    if (!trimmed) issue('reporter_name wajib diisi jika is_anonymous bernilai false');
    else if (len(trimmed) > LIMITS.name) issue(`reporter_name maksimal ${LIMITS.name} karakter`);
    else if (hasNul(trimmed)) issue('reporter_name mengandung karakter tidak valid');
  })
  .transform((d) => ({
    category: d.category,
    rating: d.rating,
    positiveFeedback: d.positive_feedback,
    improvementsNeeded: d.improvements_needed,
    isAnonymous: d.is_anonymous,
    reporterName: d.is_anonymous ? null : (d.reporter_name as string).trim(),
  }));

export type CreateEvaluationInput = z.output<typeof createEvaluationSchema>;

export interface FieldError {
  field: string;
  message: string;
}

export function toFieldErrors(error: ZodError): FieldError[] {
  return error.issues.map((i) => ({
    field: i.path.join('.') || 'body',
    message:
      i.code === 'unrecognized_keys'
        ? `Field tidak dikenal: ${i.keys.join(', ')}`
        : i.message,
  }));
}
