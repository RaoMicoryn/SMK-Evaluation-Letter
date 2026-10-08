import { CheckOutlined } from '@ant-design/icons';

const LABELS = ['Target', 'Masukan', 'Kirim'];

/** ① ── ② ── ③ : selesai = lingkaran biru + centang, aktif = kuning, belum = biru muda. */
export default function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="mb-5 flex items-center px-1 lg:hidden" aria-label="Langkah pengisian">
      {[1, 2, 3].map((n) => {
        const done = n < current;
        const active = n === current;
        const tone = active
          ? 'bg-[#FFCD45] text-[#234E8E] ring-[5px] ring-[#FFF1BC] shadow-[0_6px_12px_-6px_rgba(240,170,20,.8)]'
          : done
            ? 'bg-[#4F86C6] text-white shadow-[0_6px_12px_-6px_rgba(35,78,142,.7)]'
            : 'bg-[#E1EFFA] text-[#8FB8E0]';
        return (
          <li key={n} className={`flex items-center ${n < 3 ? 'flex-1' : ''}`} aria-current={active ? 'step' : undefined}>
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-2xl transition-all duration-300 ${tone}`}
            >
              {done ? <CheckOutlined className="text-xl" /> : n}
              <span className="sr-only">
                {' '}
                {LABELS[n - 1]}
                {done ? ' (selesai)' : ''}
              </span>
            </span>
            {n < 3 && (
              <span className="mx-2 h-[3px] flex-1 overflow-hidden rounded-full bg-[#D5E9F8]">
                <span className={`block h-full bg-[#4F86C6] transition-all duration-500 ${n < current ? 'w-full' : 'w-0'}`} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
