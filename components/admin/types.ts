export type Status = 'baru' | 'dibaca' | 'ditindaklanjuti' | 'selesai';

export interface AdminEvaluation {
  id: string;
  category: string;
  rating: number;
  positive_feedback: string | null;
  improvements_needed: string | null;
  is_anonymous: boolean;
  reporter_name: string | null;
  status: Status;
  internal_note: string | null;
  hidden_at: string | null;
  created_at: string;
  updated_at: string;
}

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  baru: { label: 'Baru', color: 'blue' },
  dibaca: { label: 'Dibaca', color: 'gold' },
  ditindaklanjuti: { label: 'Ditindaklanjuti', color: 'purple' },
  selesai: { label: 'Selesai', color: 'green' },
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(
    new Date(iso),
  );
