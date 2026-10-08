import { StarFilled } from '@ant-design/icons';
import { RATINGS, type EvaluasiFormData } from '@/lib/evaluasi';
import type { FormError } from '@/hooks/useEvaluasiForm';
import { Face, Star } from './decor/Illustrations';
import Panel from './decor/Panel';
import ErrorHint from './ErrorHint';
import StepHeader from './StepHeader';
import StepNav from './StepNav';

interface Props {
  form: EvaluasiFormData;
  error: FormError | null;
  update: <K extends keyof EvaluasiFormData>(k: K, v: EvaluasiFormData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function TargetStep({ form, error, update, onBack, onNext }: Props) {
  const current = RATINGS.find((r) => r.value === form.rating);

  return (
    <>
      <StepHeader
        step={1}
        title="Target & Penilaian"
        description="Berikan penilaian secara umum untuk acara ini."
      />

      <div className="relative z-10">
        <Panel
          key={`rate-${!form.rating && error ? error.id : 'ok'}`}
          title="Penilaian Umum"
          subtitle="Seberapa baik menurut kamu?"
          icon={<StarFilled className="!text-[#F5B731]" />}
          invalid={!!error && form.rating < 1}
        >
          <div role="radiogroup" aria-label="Penilaian umum" className="grid grid-cols-5 gap-1 text-center lg:gap-3">
            {RATINGS.map((r) => {
              const selected = form.rating === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => update('rating', r.value)}
                  className={`group flex flex-col items-center gap-2 rounded-xl px-0.5 py-1.5 transition-colors lg:gap-3 lg:py-3 ${
                    selected ? 'bg-gradient-to-b from-[#FFF8DC] to-[#FFEDB0] shadow-[0_0_0_2px_#FFD966,0_10px_16px_-10px_rgba(240,170,20,.9)]' : 'hover:-translate-y-0.5 hover:bg-[#F1F8FE]'
                  }`}
                >
                  <Star filled={form.rating >= r.value} className="w-8 lg:w-10 drop-shadow-[0_3px_3px_rgba(240,170,20,.45)] transition-transform group-hover:scale-110" />
                  <Face
                    kind={r.value as 1 | 2 | 3 | 4 | 5}
                    className={`w-9 drop-shadow-[0_3px_3px_rgba(150,100,20,.25)] transition-all md:w-10 lg:w-12 ${
                      selected ? 'animate-pop' : form.rating ? 'opacity-50' : 'opacity-100'
                    }`}
                  />
                  <span className={`text-[13px] leading-tight lg:text-[15px] ${selected ? 'text-[#234E8E]' : 'text-[#3E69A3]'}`}>
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-3 rounded-xl bg-[#F1F8FE] px-3 py-2 text-center text-base text-[#3E69A3]">
            {current ? (
              <>
                <span className="font-display text-lg text-[#234E8E]">{current.label}</span> · {current.caption}
              </>
            ) : (
              'Ketuk bintang atau wajah untuk menilai.'
            )}
          </p>
        </Panel>
      </div>

      {error && <ErrorHint key={error.id} message={error.message} />}
      <StepNav onBack={onBack} onNext={onNext} />
    </>
  );
}
