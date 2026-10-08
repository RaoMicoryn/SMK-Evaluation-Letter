import type { ReactNode } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import type { Screen } from '@/lib/evaluasi';
import { PuppyBox } from './decor/Mascot';
import {
  Cloud, Cross, Dashes, Dot, Heart, HouseOutline, HouseSolid, Paw, Plane, Plus, Sparkle4, Star,
} from './decor/Illustrations';

function CardWave() {
  return (
    <svg aria-hidden viewBox="0 0 300 100" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-24 w-full">
      <path d="M0 52C16 34 46 34 64 50C84 26 126 26 148 48C168 30 208 32 230 50C250 36 284 38 300 54V100H0Z" fill="#E6F2FC" />
      <path d="M0 70C20 54 52 54 74 68C96 50 134 52 156 68C178 54 214 56 236 68C258 58 286 60 300 72V100H0Z" fill="#DAEBF9" />
    </svg>
  );
}

/** Dekor kecil di dalam kartu (di area margin, di belakang konten). */
function CardScatter() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Star className="absolute left-3 top-44 w-3.5 animate-twinkle" />
      <Sparkle4 className="absolute right-4 top-28 w-4 animate-spin-slow" />
      <Dot className="absolute left-2 top-[38%] w-2" />
      <Plus className="absolute right-2.5 top-[44%] w-3" />
      <Sparkle4 className="absolute left-3 top-[58%] w-3 animate-twinkle" color="#BFE0F7" />
      <Dot className="absolute right-3 top-[62%] w-2" color="#FFE08A" />
      <Heart className="absolute bottom-40 left-3 w-4" />
      <Star className="absolute bottom-44 right-3 w-3.5 animate-twinkle" style={{ animationDelay: '1s' }} />
      <Plus className="absolute bottom-52 left-2.5 w-3" />
    </div>
  );
}

/** Dekor di luar kartu (tampil di layar lebar). */
function PageDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Cloud className="absolute -left-12 top-8 w-52 animate-drift text-white/90" />
      <Cloud className="absolute -right-16 top-[30%] w-60 animate-drift text-white/80" style={{ animationDelay: '3s' }} />
      <Cloud className="absolute -bottom-8 left-[18%] w-72 text-white/90" />
      <Cloud className="absolute bottom-24 right-[6%] hidden w-40 text-white/70 md:block" />

      <Star className="absolute left-[7%] top-[18%] hidden w-9 animate-twinkle md:block" />
      <Star className="absolute right-[9%] top-[12%] hidden w-7 animate-twinkle md:block" style={{ animationDelay: '.8s' }} />
      <Star className="absolute bottom-[16%] right-[8%] hidden w-10 animate-twinkle md:block" style={{ animationDelay: '1.4s' }} />
      <Sparkle4 className="absolute left-[12%] top-[46%] hidden w-6 animate-spin-slow md:block" />
      <Sparkle4 className="absolute right-[14%] top-[52%] hidden w-5 animate-twinkle md:block" color="#FFD966" />
      <Heart className="absolute bottom-[28%] left-[8%] hidden w-9 animate-float md:block" />
      <Heart className="absolute right-[12%] top-[28%] hidden w-6 animate-float md:block" style={{ animationDelay: '1s' }} />
      <Plane className="absolute left-[10%] top-[30%] hidden w-14 -rotate-6 animate-float md:block" />
      <Cross className="absolute left-[20%] top-[12%] hidden w-5 md:block" />
      <Cross className="absolute bottom-[12%] right-[20%] hidden w-4 md:block" />
      <Plus className="absolute left-[5%] top-[62%] hidden w-5 md:block" />
      <Plus className="absolute right-[6%] top-[70%] hidden w-4 md:block" />
      <Dot className="absolute left-[16%] top-[70%] hidden w-3 md:block" color="#FFE08A" />
      <Dot className="absolute right-[18%] top-[22%] hidden w-3 md:block" />
      <Dashes className="absolute left-[4%] top-[8%] hidden w-9 md:block" />
      <Dashes className="absolute bottom-[8%] right-[4%] hidden w-9 -scale-x-100 md:block" />
      <Paw className="absolute bottom-[10%] left-[7%] hidden w-8 -rotate-12 text-[#B7D9F5] md:block" />
      <Paw className="absolute bottom-[16%] left-[11%] hidden w-6 rotate-12 text-[#B7D9F5] md:block" />
      <Paw className="absolute right-[7%] top-[40%] hidden w-7 rotate-12 text-[#B7D9F5] md:block" />
    </div>
  );
}

const STEPS = [
  { title: 'Target & Penilaian', desc: 'Beri nilai untuk acara' },
  { title: 'Kritik & Masukan', desc: 'Ceritakan pendapatmu' },
  { title: 'Identitas & Kirim', desc: 'Opsional, lalu kirim' },
];

function Brand() {
  return (
    <div className="flex items-center gap-2 font-display text-2xl text-[#234E8E]">
      <HouseOutline className="w-8" />
      Kotak Evaluasi
    </div>
  );
}

/** Sidebar langkah: hanya tampil di desktop (lg+) pada step 1-3. */
function SideNav({ screen }: { screen: Screen }) {
  return (
    <aside className="relative hidden flex-col overflow-hidden bg-gradient-to-b from-[#EAF5FE] via-[#DCEEFC] to-[#C4E0F7] p-8 lg:flex">
      <Cloud className="pointer-events-none absolute -right-10 top-24 w-40 text-white/70" />
      <Star className="pointer-events-none absolute right-8 top-10 w-5 animate-twinkle" />
      <Sparkle4 className="pointer-events-none absolute bottom-[38%] right-6 w-4 animate-twinkle" />
      <Brand />

      <ol className="relative mt-10" aria-label="Langkah pengisian">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const done = n < screen;
          const active = n === screen;
          const tone = active
            ? 'bg-[#FFCD45] text-[#234E8E] ring-[5px] ring-[#FFF1BC] shadow-[0_6px_12px_-6px_rgba(240,170,20,.8)]'
            : done
              ? 'bg-[#4F86C6] text-white shadow-[0_6px_12px_-6px_rgba(35,78,142,.7)]'
              : 'bg-white/80 text-[#8FB8E0]';
          return (
            <li key={n} className="relative flex gap-4 pb-8 last:pb-0" aria-current={active ? 'step' : undefined}>
              {n < 3 && (
                <span className="absolute bottom-1 left-[1.45rem] top-[3.4rem] w-[3px] overflow-hidden rounded-full bg-white/80">
                  <span className={`block w-full bg-[#4F86C6] transition-all duration-500 ${done ? 'h-full' : 'h-0'}`} />
                </span>
              )}
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-2xl transition-all duration-300 ${tone}`}>
                {done ? <CheckOutlined className="text-xl" /> : n}
              </span>
              <div className="pt-0.5 leading-tight">
                <p className="text-[13px] font-bold uppercase tracking-wider text-[#5F8FC4]">Step {n}</p>
                <p className={`font-display text-xl ${active ? 'text-[#234E8E]' : 'text-[#3E69A3]'}`}>{s.title}</p>
                <p className="text-[15px] text-[#5F8FC4]">{s.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-auto pt-6 text-center">
        <PuppyBox className="mx-auto w-48 animate-bob" />
        <p className="mt-1 -rotate-2 font-hand text-xl leading-tight text-[#3E69A3]">Masukan kecil, perubahan besar!</p>
      </div>
    </aside>
  );
}

export default function WizardShell({ children, screen }: { children: ReactNode; screen: Screen }) {
  // step 1-3 di desktop: sidebar + form. Cover & terima kasih: satu kolom lebar (isinya 2 kolom).
  const split = screen >= 1 && screen <= 3;
  const mobileOnly = split ? 'lg:hidden' : '';

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_0%,#ffffff_0%,transparent_42%),radial-gradient(circle_at_90%_85%,#FFF6D0_0%,transparent_30%),linear-gradient(to_bottom,#D3E9FA,#EEF7FF)] px-4 py-8 lg:px-10 lg:py-12">
      <PageDecor />

      <div
        className={`relative w-full max-w-md overflow-hidden rounded-[1.75rem] border-2 border-[#BFDDF6] bg-gradient-to-b from-white via-[#FBFDFF] to-[#F2F8FE] shadow-[0_0_0_6px_rgba(255,255,255,.65),0_2px_0_#fff_inset,0_28px_60px_-20px_rgba(60,120,200,.55)] md:max-w-lg lg:max-w-[70rem] lg:rounded-[2.5rem] lg:shadow-[0_0_0_8px_rgba(255,255,255,.65),0_2px_0_#fff_inset,0_40px_90px_-30px_rgba(60,120,200,.6)] ${
          split
            ? 'px-6 pb-20 pt-5 md:px-8 lg:grid lg:grid-cols-[19rem_1fr] lg:p-0'
            : 'px-6 pb-20 pt-5 md:px-8 lg:px-16 lg:pb-28 lg:pt-8'
        }`}
      >
        <div aria-hidden className={mobileOnly}>
          <CardScatter />
          <Paw className="pointer-events-none absolute bottom-6 left-14 w-4 rotate-6 text-[#B7D9F5]" />
        </div>
        <div aria-hidden className={mobileOnly}>
          <CardWave />
          <Paw className="pointer-events-none absolute bottom-3 left-4 w-7 -rotate-12 text-[#8EC1EE]" />
          <Paw className="pointer-events-none absolute bottom-3 right-4 w-7 rotate-12 text-[#8EC1EE]" />
          <Paw className="pointer-events-none absolute bottom-6 right-14 w-4 -rotate-6 text-[#B7D9F5]" />
        </div>

        {split && <SideNav screen={screen} />}

        <div className={split ? 'relative lg:px-14 lg:py-12' : 'relative'}>
          {split && (
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              <Star className="absolute right-10 top-8 w-6 animate-twinkle" />
              <Sparkle4 className="absolute right-24 top-20 w-4 animate-spin-slow" />
              <Heart className="absolute bottom-10 right-12 w-6 animate-float" />
              <Dashes className="absolute right-6 top-28 w-7" />
            </div>
          )}

          <header className={`relative z-10 mb-5 flex items-center justify-between ${split ? 'lg:hidden' : 'lg:mb-8'}`}>
            <Brand />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4FD] text-[#3D6CA8]">
              <HouseSolid className="w-4" />
            </span>
          </header>

          <main className="relative z-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
