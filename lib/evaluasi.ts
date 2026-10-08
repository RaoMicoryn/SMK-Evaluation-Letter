export const MAX_LENGTH = 500;

export const CATEGORIES = [{ value: 'acara', label: 'Acara' }] as const;

/** Satu-satunya target evaluasi saat ini (dikirim ke API apa adanya). */
export const DEFAULT_CATEGORY = 'acara';

export const RATINGS = [
  { value: 1, label: 'Perlu Perbaikan', caption: 'Terima kasih sudah jujur, kami akan berbenah.' },
  { value: 2, label: 'Cukup Baik', caption: 'Masih ada ruang untuk jadi lebih baik.' },
  { value: 3, label: 'Netral', caption: 'Biasa saja, tapi masukanmu tetap berarti.' },
  { value: 4, label: 'Baik', caption: 'Senang mendengarnya!' },
  { value: 5, label: 'Sangat Baik', caption: 'Wah, mantap! Terima kasih banyak.' },
] as const;

export const QUICK_POSITIVE = ['Kegiatannya seru', 'Panitia ramah', 'Tempat bersih', 'Tepat waktu'];
export const QUICK_IMPROVE = ['Perlu lebih rapi', 'Waktu kurang tepat', 'Fasilitas kurang', 'Info kurang jelas'];

export interface EvaluasiFormData {
  category: string | null;
  rating: number;
  positive: string;
  improvement: string;
  name: string;
  isAnonymous: boolean;
}

export const INITIAL_FORM: EvaluasiFormData = {
  category: DEFAULT_CATEGORY,
  rating: 0,
  positive: '',
  improvement: '',
  name: '',
  isAnonymous: true,
};

export type Screen = 0 | 1 | 2 | 3 | 4;

export function getCategory(value: string | null) {
  return CATEGORIES.find((c) => c.value === value);
}

/** Return pesan error, atau null kalau valid. */
export function validateStep(step: 1 | 2 | 3, d: EvaluasiFormData): string | null {
  if (step === 1) {
    if (d.rating < 1) return 'Berikan penilaian umum (minimal 1 bintang).';
  }
  if (step === 2) {
    if (!d.positive.trim() && !d.improvement.trim()) return 'Isi minimal salah satu masukan ya.';
  }
  return null;
}

export function validateAll(d: EvaluasiFormData): { step: 1 | 2; error: string } | null {
  for (const step of [1, 2] as const) {
    const error = validateStep(step, d);
    if (error) return { step, error };
  }
  return null;
}

export function buildPayload(d: EvaluasiFormData) {
  return {
    category: d.category,
    rating: d.rating,
    positive_feedback: d.positive.trim() || null,
    improvements_needed: d.improvement.trim() || null,
    is_anonymous: d.isAnonymous,
    reporter_name: d.isAnonymous ? null : d.name.trim() || null,
  };
}

/* ---------- Draft / autosave (localStorage) ---------- */

const DRAFT_KEY = 'kotak-evaluasi:draft:v1';

export interface Draft {
  form: EvaluasiFormData;
  screen: 1 | 2 | 3;
}

function isEmptyForm(d: EvaluasiFormData) {
  return d.rating < 1 && !d.positive && !d.improvement && !d.name;
}

export function saveDraft(form: EvaluasiFormData, screen: Screen) {
  try {
    if (screen < 1 || screen > 3 || isEmptyForm(form)) return localStorage.removeItem(DRAFT_KEY);
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ form, screen }));
  } catch {
    /* storage penuh / diblokir (mode privat): abaikan */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

/** Baca draft & sanitasi, supaya data rusak/lama tidak bikin crash. */
export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const f = JSON.parse(raw)?.form;
    const screen = JSON.parse(raw)?.screen;
    if (!f || typeof f !== 'object') return null;

    const form: EvaluasiFormData = {
      category: DEFAULT_CATEGORY,
      rating: Number.isInteger(f.rating) && f.rating >= 0 && f.rating <= 5 ? f.rating : 0,
      positive: String(f.positive ?? '').slice(0, MAX_LENGTH),
      improvement: String(f.improvement ?? '').slice(0, MAX_LENGTH),
      name: String(f.name ?? '').slice(0, 100),
      isAnonymous: f.isAnonymous !== false,
    };
    if (isEmptyForm(form)) return null;
    return { form, screen: screen === 2 || screen === 3 ? screen : 1 };
  } catch {
    return null;
  }
}
