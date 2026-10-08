import { Dashes } from './decor/Illustrations';
import StepIndicator from './StepIndicator';

interface Props {
  step: 1 | 2 | 3;
  title: string;
  description: string;
}

export default function StepHeader({ step, title, description }: Props) {
  return (
    <div className="mb-4 lg:mb-8">
      <StepIndicator current={step} />
      <p className="text-base font-semibold text-[#5F8FC4] lg:hidden">Step {step} dari 3</p>
      <h2 className="relative isolate inline-block font-display text-[2.1rem] leading-tight lg:text-[3rem] text-[#234E8E] after:absolute after:inset-x-0 after:bottom-1.5 after:-z-10 after:h-3 after:-rotate-1 after:rounded-full after:bg-[#FFE7A0]/90 after:content-['']">
        {title}
        <Dashes className="absolute -right-9 -top-2 w-8" />
      </h2>
      <p className="mt-1 text-[16px] leading-snug text-[#3E69A3] lg:mt-3 lg:max-w-xl lg:text-lg">{description}</p>
    </div>
  );
}
