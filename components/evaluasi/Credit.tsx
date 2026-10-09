import { CREDIT_NAME } from '@/lib/credit';

/** Watermark kecil di bagian bawah halaman. Tidak bisa diklik dan tidak menghalangi tombol. */
export default function Credit({ className = '' }: { className?: string }) {
  const name = CREDIT_NAME.trim();
  return (
    <p className={`pointer-events-none select-none text-xs font-semibold text-[#3E69A3]/70 ${className}`}>
      Dibuat oleh{name ? ` ${name}` : ''}
    </p>
  );
}