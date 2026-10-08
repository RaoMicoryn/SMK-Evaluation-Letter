import { HomeFilled, LockFilled, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { RATINGS, getCategory, type EvaluasiFormData } from '@/lib/evaluasi';
import {
  Cloud, Cross, Dashes, Dot, Face, Heart, Leaf, Paw, Plane, Plus, Rocket, Sparkle4, Star,
} from './decor/Illustrations';
import CategoryIcon from './CategoryIcon';
import { JoyScene } from './decor/Mascot';
import { btnYellow } from './ui';

// confetti statis (aman untuk SSR)
const CONFETTI = [
  ['4%', '0s', '#FFD966', 9], ['12%', '1.1s', '#86C3A3', 7], ['21%', '.5s', '#FF9AA2', 8],
  ['30%', '2s', '#7FB2E5', 7], ['39%', '.9s', '#FFD966', 10], ['48%', '2.6s', '#FF9AA2', 8],
  ['57%', '.2s', '#86C3A3', 9], ['66%', '1.7s', '#7FB2E5', 8], ['75%', '2.3s', '#FFD966', 7],
  ['84%', '.7s', '#FF9AA2', 9], ['92%', '1.4s', '#86C3A3', 8],
] as const;

export default function ThankYouScreen({ form, onReset }: { form: EvaluasiFormData; onReset: () => void }) {
  const cat = getCategory(form.category);
  const rating = RATINGS.find((r) => r.value === form.rating);

  return (
    <div className="relative text-center lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-x-10 lg:text-left">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-[28rem] overflow-hidden lg:-top-16 lg:h-[36rem]">
        {CONFETTI.map(([left, delay, color, size], i) => (
          <span
            key={i}
            className="absolute top-0 animate-confetti rounded-[2px]"
            style={{ left, width: size, height: size * 1.6, background: color, animationDelay: delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-[21rem] lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:max-w-[31rem]">
        <JoyScene className="w-full" />
        <Star className="absolute left-2 top-6 w-9 animate-twinkle" />
        <Star className="absolute right-12 top-10 w-7 animate-twinkle" style={{ animationDelay: '.7s' }} />
        <Star className="absolute right-0 top-[48%] w-5 animate-twinkle" style={{ animationDelay: '1.3s' }} />
        <Star className="absolute left-0 top-[52%] w-5 animate-twinkle" style={{ animationDelay: '1.9s' }} />
        <Cross className="absolute left-1 top-[30%] w-6" />
        <Cross className="absolute right-4 top-[66%] w-4" />
        <Rocket className="absolute right-8 top-0 w-11 rotate-12 animate-float" />
        <Plane className="absolute right-0 top-14 hidden w-12 rotate-6 animate-float sm:block" />
        <Dashes className="absolute right-2 top-0 w-8" />
        <Dashes className="absolute left-5 top-3 w-7 -scale-x-100" />
        <Heart className="absolute bottom-[26%] right-3 w-7 animate-float" />
        <Heart className="absolute bottom-[34%] left-1 w-5 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkle4 className="absolute left-16 top-[24%] w-4 animate-spin-slow" />
        <Plus className="absolute right-16 top-[42%] w-4" />
        <Dot className="absolute left-12 top-[40%] w-2.5" color="#FFE08A" />
        <Dot className="absolute right-20 top-6 w-2" />
      </div>

      <h2 className="relative z-30 -mt-5 -rotate-[5deg] font-hand text-[3.6rem] leading-none text-[#234E8E] lg:col-start-1 lg:mt-0 lg:text-[6rem]">
        Terima Kasih!
      </h2>

      <div className="relative mx-auto mt-4 max-w-xs lg:col-start-1 lg:mx-0 lg:mt-6 lg:max-w-md">
        <Dashes className="absolute -left-2 top-1 w-6 -scale-x-100" />
        <p className="-rotate-2 text-[17px] leading-snug text-[#3E69A3] lg:text-xl lg:leading-relaxed">
          Masukan kamu sudah terkirim.
          <br />
          Bersama kita wujudkan sekolah
          <br />
          yang lebih baik!
        </p>
      </div>

      {(cat || rating) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:col-start-1 lg:mt-6 lg:justify-start">
          {cat && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FD] px-3 py-1 text-[15px] text-[#234E8E]">
              <CategoryIcon value={cat.value} /> {cat.label}
            </span>
          )}
          {rating && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FD] px-3 py-1 text-[15px] text-[#234E8E]">
              <Face kind={rating.value as 1 | 2 | 3 | 4 | 5} className="w-5" /> {rating.label}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FD] px-3 py-1 text-[15px] text-[#234E8E]">
            {form.isAnonymous ? (
              <>
                <LockFilled className="text-[#4F86C6]" /> Anonim
              </>
            ) : (
              <>
                <UserOutlined className="text-[#4F86C6]" /> {form.name.trim() || 'Tanpa nama'}
              </>
            )}
          </span>
        </div>
      )}

      <div className="relative mx-auto mt-6 flex max-w-[17rem] -rotate-2 items-center lg:col-start-1 lg:mx-0 lg:mt-7 lg:max-w-sm gap-3 rounded-[2rem] bg-[#E3F1FC] px-5 py-3 text-left">
        <Paw className="w-7 shrink-0 text-[#4F86C6]" />
        <p className="font-hand text-xl leading-tight text-[#3E69A3]">
          Suaramu penting!
          <br />
          Terus jadi bagian dari perubahan ya!
        </p>
      </div>

      <div className="lg:col-start-1 lg:mt-8"><Button block className={`${btnYellow} mt-6 lg:!mt-0 lg:!h-14 lg:!w-auto lg:!px-10 lg:!text-2xl`} icon={<HomeFilled />} onClick={onReset}>
        Kembali ke Beranda
      </Button></div>
    </div>
  );
}
