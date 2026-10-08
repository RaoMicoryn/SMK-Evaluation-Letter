import { LikeOutlined, WarningFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { MAX_LENGTH, QUICK_IMPROVE, QUICK_POSITIVE, type EvaluasiFormData } from '@/lib/evaluasi';
import type { FormError } from '@/hooks/useEvaluasiForm';
import Panel from './decor/Panel';
import ErrorHint from './ErrorHint';
import QuickChips from './QuickChips';
import StepHeader from './StepHeader';
import StepNav from './StepNav';

interface Props {
  form: EvaluasiFormData;
  error: FormError | null;
  update: <K extends keyof EvaluasiFormData>(k: K, v: EvaluasiFormData[K]) => void;
  onBack: () => void;
  onNext: () => void;
}

const counter = {
  formatter: ({ count, maxLength }: { count: number; maxLength?: number }) => (
    <span className={count >= (maxLength ?? 500) * 0.9 ? 'text-[#E09A00]' : ''}>
      {count}/{maxLength}
    </span>
  ),
};

export default function FeedbackStep({ form, error, update, onBack, onNext }: Props) {
  const empty = !form.positive.trim() && !form.improvement.trim();

  const append = (key: 'positive' | 'improvement', chip: string) => {
    if (form[key].toLowerCase().includes(chip.toLowerCase())) return; // jangan dobel
    const base = form[key].trim().replace(/[.\s]+$/, '');
    update(key, ((base ? `${base}. ` : '') + chip + '.').slice(0, MAX_LENGTH));
  };

  return (
    <>
      <StepHeader
        step={2}
        title="Kritik & Masukan"
        description="Ceritakan pendapatmu tentang hal-hal apa yang sudah bagus dan yang perlu ditingkatkan di sekolah."
      />

      <div className="relative z-10 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-5">
        <Panel
          key={`pos-${empty && error ? error.id : 'ok'}`}
          title="Hal yang Sudah Bagus"
          icon={<LikeOutlined />}
          invalid={!!error && empty}
          className="mb-4 lg:mb-0"
        >
          <QuickChips items={QUICK_POSITIVE} onPick={(c) => append('positive', c)} />
          <Input.TextArea
            rows={6}
            maxLength={MAX_LENGTH}
            showCount={counter}
            placeholder="Tulis di sini..."
            value={form.positive}
            onChange={(e) => update('positive', e.target.value)}
          />
        </Panel>

        <Panel title="Hal yang Perlu Ditingkatkan" icon={<WarningFilled />} invalid={!!error && empty}>
          <QuickChips items={QUICK_IMPROVE} onPick={(c) => append('improvement', c)} />
          <Input.TextArea
            rows={6}
            maxLength={MAX_LENGTH}
            showCount={counter}
            placeholder="Tulis di sini..."
            value={form.improvement}
            onChange={(e) => update('improvement', e.target.value)}
          />
        </Panel>
      </div>

      {error && <ErrorHint key={error.id} message={error.message} />}
      <StepNav onBack={onBack} onNext={onNext} />
    </>
  );
}
