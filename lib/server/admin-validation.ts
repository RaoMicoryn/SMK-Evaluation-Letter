import { z } from 'zod';

const NO_NUL = (v: string) => !v.includes('\u0000');
const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

export const STATUSES = ['baru', 'dibaca', 'ditindaklanjuti', 'selesai'] as const;

export const loginSchema = z
  .object({ password: z.string({ required_error: 'Password wajib diisi' }).min(1, 'Password wajib diisi').max(200) })
  .strict();

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().trim().max(50).optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  status: z.enum(STATUSES).optional(),
  hidden: z.enum(['visible', 'hidden', 'all']).default('visible'),
  q: z.string().trim().max(100).refine(NO_NUL).optional(),
  from: z.string().refine(isDate, 'from harus berformat YYYY-MM-DD').optional(),
  to: z.string().refine(isDate, 'to harus berformat YYYY-MM-DD').optional(),
});

export const updateSchema = z
  .object({
    status: z.enum(STATUSES).optional(),
    internal_note: z
      .string()
      .nullable()
      .optional()
      .transform((v) => (v == null ? v : v.trim() || null))
      .refine((v) => v == null || (Array.from(v).length <= 1000 && NO_NUL(v)), 'internal_note maksimal 1000 karakter'),
    hidden: z.boolean().optional(),
  })
  .strict()
  .refine((d) => Object.values(d).some((v) => v !== undefined), 'Tidak ada perubahan yang dikirim');

export const idSchema = z.string().uuid('id tidak valid');
