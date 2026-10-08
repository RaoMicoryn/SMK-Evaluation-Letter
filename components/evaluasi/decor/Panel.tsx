import type { ReactNode } from 'react';
import { Dashes } from './Illustrations';

interface Props {
  title: ReactNode;
  icon: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  invalid?: boolean;
  className?: string;
}

/** Kartu putih bergaris biru muda + coretan kuning di pojok (flat). */
export default function Panel({ title, icon, subtitle, children, invalid, className = '' }: Props) {
  return (
    <section
      className={`relative rounded-2xl border-[1.5px] p-4 lg:p-6 shadow-[0_1px_0_#fff_inset,0_2px_0_#E3F1FC,0_16px_28px_-18px_rgba(79,134,198,.6)] transition-all duration-200 lg:hover:-translate-y-0.5 ${
        invalid ? 'animate-shake border-[#F5B7B1] bg-[#FFFAF9]' : 'border-[#BFDDF6] bg-gradient-to-b from-white to-[#F6FAFF]'
      } ${className}`}
    >
      <Dashes className="absolute right-3 top-2 w-6" />
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[1.9rem] text-[#2F5D9E]">
          {icon}
        </span>
        <div className="leading-tight">
          <p className="font-display text-xl text-[#234E8E]">{title}</p>
          {subtitle && <p className="text-[15px] text-[#5F8FC4]">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
