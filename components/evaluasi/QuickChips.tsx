interface Props {
  label?: string;
  items: string[];
  onPick: (item: string) => void;
}

/** Contoh cepat: ketuk untuk menambahkan ke isian. */
export default function QuickChips({ label = 'Contoh cepat:', items, onPick }: Props) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-1.5">
      <span className="text-sm text-[#7FA6D1]">{label}</span>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPick(item)}
          className="rounded-full border border-[#C4E1F7] bg-[#F1F8FE] px-2.5 py-0.5 text-sm text-[#3E69A3] transition hover:bg-[#E3F1FC] active:scale-95"
        >
          + {item}
        </button>
      ))}
    </div>
  );
}
