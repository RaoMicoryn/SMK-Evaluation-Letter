import { CheckCircleFilled, EyeInvisibleOutlined, FormOutlined, LockFilled, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Switch } from 'antd';
import { RATINGS, getCategory, type EvaluasiFormData } from '@/lib/evaluasi';
import type { FormError } from '@/hooks/useEvaluasiForm';
import { Cloud, Dashes, Face, Heart, Plane, Sparkle4 } from './decor/Illustrations';
import Panel from './decor/Panel';
import CategoryIcon from './CategoryIcon';
import ErrorHint from './ErrorHint';
import StepHeader from './StepHeader';
import StepNav from './StepNav';

interface Props {
  form: EvaluasiFormData;
  loading: boolean;
  error: FormError | null;
  update: <K extends keyof EvaluasiFormData>(k: K, v: EvaluasiFormData[K]) => void;
  setAnonymous: (v: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4FD] px-3 py-1 text-[15px] text-[#234E8E]">
      {children}
    </span>
  );
}

export default function IdentityStep({ form, loading, error, update, setAnonymous, onBack, onSubmit }: Props) {
  const cat = getCategory(form.category);
  const rating = RATINGS.find((r) => r.value === form.rating);
  const filled = [form.positive, form.improvement].filter((t) => t.trim()).length;

  return (
    <>
      <StepHeader
        step={3}
        title="Identitas & Submit"
        description="Terima kasih atas waktu dan kesediaanmu (opsional) dan kirim evaluasimu."
      />

      <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-5">
        <Panel
          title={<>Nama <span className="text-base">(Opsional)</span></>}
          icon={<UserOutlined />}
          className="mb-3 lg:mb-0"
        >
          <Input
            size="large"
            placeholder={form.isAnonymous ? 'Nonaktif saat mode anonim' : 'Masukkan nama kamu...'}
            value={form.name}
            disabled={form.isAnonymous}
            maxLength={60}
            onChange={(e) => update('name', e.target.value)}
          />
        </Panel>

        <section className="mb-3 rounded-2xl border-[1.5px] lg:mb-0 lg:p-6 border-[#BFDDF6] bg-gradient-to-b from-white to-[#F6FAFF] p-3 shadow-[0_1px_0_#fff_inset,0_2px_0_#E3F1FC,0_16px_28px_-18px_rgba(79,134,198,.6)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3D6CA8] text-xl text-white">
                <EyeInvisibleOutlined />
              </span>
              <div className="leading-tight">
                <p className="font-display text-xl text-[#234E8E]">Kirim secara Anonim</p>
                <p className="text-[15px] text-[#5F8FC4]">Rahasiakan nama kamu.</p>
              </div>
            </div>
            <Switch checked={form.isAnonymous} onChange={setAnonymous} aria-label="Kirim secara anonim" />
          </div>
          {form.isAnonymous && (
            <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#F1F8FE] px-2.5 py-1 text-[15px] text-[#3E69A3]">
              <LockFilled className="text-[#4F86C6]" /> Mode anonim aktif, namamu tidak akan dikirim.
            </p>
          )}
        </section>

        {/* ringkasan sebelum kirim */}
        <Panel title="Ringkasan" icon={<CheckCircleFilled className="!text-[#4F86C6]" />} className="lg:col-span-2">
          <div className="flex flex-wrap gap-2">
            {cat && (
              <Chip>
                <CategoryIcon value={cat.value} />
                {cat.label}
              </Chip>
            )}
            {rating && (
              <Chip>
                <Face kind={rating.value as 1 | 2 | 3 | 4 | 5} className="w-5" />
                {rating.label}
              </Chip>
            )}
            <Chip>
              <FormOutlined className="text-[#4F86C6]" />
              {filled} dari 2 masukan terisi
            </Chip>
          </div>
        </Panel>
      </div>

      {/* awan ucapan terima kasih */}
      <div className="relative z-10 mt-2 flex h-28 items-center justify-center lg:h-32">
        <Cloud className="absolute inset-0 mx-auto h-full w-full max-w-[17rem] text-[#E3F1FC]" />
        <Plane className="absolute left-8 top-4 w-10 -rotate-6 animate-float" />
        <Dashes className="absolute left-4 top-1 w-6 -scale-x-100" />
        <Dashes className="absolute right-6 top-0 w-6" />
        <Heart className="absolute bottom-3 right-10 w-5" />
        <Sparkle4 className="absolute bottom-4 left-12 w-4 animate-twinkle" />
        <p className="relative -rotate-6 text-center font-hand text-2xl leading-tight text-[#234E8E]">
          Terima kasih
          <br />
          sudah berbagi
          <br />
          masukan!
        </p>
      </div>

      {error && <ErrorHint key={error.id} message={error.message} />}
      <StepNav
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Kirim Evaluasi"
        nextIcon={<SendOutlined />}
        loading={loading}
      />
    </>
  );
}
