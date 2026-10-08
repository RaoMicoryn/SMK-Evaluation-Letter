import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Cross, Dashes, Dot, Heart, Plane, PlaneTrail, Plus, Sparkle4, Squiggle, Star } from './decor/Illustrations';
import { HeroScene } from './decor/Mascot';
import { btnYellow } from './ui';

export default function CoverScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-x-10 lg:text-left">
      <div className="relative px-6 pt-1 lg:col-start-1 lg:px-0 lg:pt-0">
        <Dashes className="absolute left-0 top-4 w-9 lg:-left-9 lg:top-2" />
        <Dashes className="absolute right-0 top-0 w-9 -scale-x-100 lg:right-8" />
        <Star className="absolute right-3 top-16 w-4 animate-twinkle lg:right-24 lg:top-24 lg:w-6" />
        <Sparkle4 className="absolute left-2 top-24 w-5 animate-twinkle lg:hidden" />
        <h1 className="-rotate-3 font-hand text-[3.2rem] leading-[1] text-[#234E8E] [text-shadow:0_3px_0_#fff,0_8px_14px_rgba(47,93,158,.28)] md:text-[3.5rem] lg:-rotate-2 lg:text-[5rem] lg:leading-[.95]">
          Yuk, Bagikan
          <br />
          Masukanmu!
        </h1>
        <Squiggle className="mx-auto -mt-1 w-28 -rotate-3 lg:mx-0 lg:w-40" />
      </div>

      <p className="mx-auto mt-3 max-w-xs text-[16.5px] font-medium leading-snug text-[#3E69A3] lg:col-start-1 lg:mx-0 lg:mt-5 lg:max-w-md lg:text-xl lg:leading-relaxed">
        Kotak Evaluasi adalah tempat untuk menyampaikan saran, kritik, dan penilaian demi lingkungan sekolah yang
        lebih baik. Suaramu berarti untuk kami!
      </p>

      <div className="relative mx-auto mt-2 w-full max-w-[22rem] lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:max-w-[33rem]">
        <HeroScene className="w-full" />

        <Star className="absolute left-3 top-6 w-9 animate-twinkle" />
        <Star className="absolute right-24 top-0 w-5 animate-twinkle" style={{ animationDelay: '.9s' }} />
        <Star className="absolute right-0 top-[55%] w-5 animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <Heart className="absolute -left-1 top-[28%] w-9 animate-float" />
        <Heart className="absolute left-8 top-[46%] w-5 animate-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute right-3 top-[40%] w-6 animate-float" style={{ animationDelay: '.5s' }} />
        <Plane className="absolute right-0 top-6 w-14 rotate-6 animate-float" style={{ animationDuration: '6s' }} />
        <PlaneTrail className="absolute right-12 top-[17%] w-12 -rotate-12" />
        <Dashes className="absolute right-0 top-[30%] w-7" />
        <Dashes className="absolute left-14 top-0 w-6 rotate-12" />
        <Sparkle4 className="absolute left-20 top-[22%] w-4 animate-spin-slow" />
        <Sparkle4 className="absolute right-10 top-[62%] w-4 animate-twinkle" color="#BFE0F7" />
        <Sparkle4 className="absolute bottom-[8%] left-3 w-6 animate-twinkle" color="#FFD34D" />
        <Cross className="absolute left-0 top-[66%] w-4" />
        <Plus className="absolute right-5 top-[72%] w-4" />
        <Dot className="absolute left-16 top-[14%] w-2" color="#FFE08A" />
        <Dot className="absolute right-24 top-[24%] w-2.5" />
      </div>

      <div className="lg:col-start-1 lg:mt-7">
      <Button
        block
        className={`${btnYellow} group mt-3 lg:!mt-0 lg:!h-14 lg:!w-auto lg:!px-12 lg:!text-2xl`}
        onClick={onStart}
        icon={<ArrowRightOutlined className="transition-transform group-hover:translate-x-1" />}
        iconPosition="end"
      >
        Mulai
      </Button>
      </div>

      <div className="relative mt-5 flex flex-col items-center lg:col-start-1 lg:mt-8 lg:items-start">
        <Dashes className="absolute left-6 top-1 w-7 -scale-x-100 lg:hidden" />
        <Dashes className="absolute right-6 top-0 w-7 lg:right-auto lg:left-52" />
        <p className="-rotate-3 font-hand text-[1.35rem] leading-tight text-[#3E69A3] lg:text-3xl">
          Masukan kecil,
          <br />
          perubahan besar!
        </p>
        <Squiggle className="-mt-0.5 w-24 -rotate-3 lg:w-32" />
        <Heart className="absolute bottom-0 right-12 w-5 lg:right-auto lg:left-60" />
      </div>
    </div>
  );
}
