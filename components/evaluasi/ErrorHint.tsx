import { WarningFilled } from '@ant-design/icons';

export default function ErrorHint({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-4 flex animate-shake items-start gap-2 rounded-xl border-[1.5px] border-[#F5C542] bg-[#FFF8DC] px-3 py-2 text-base text-[#8A5A00]"
    >
      <WarningFilled className="mt-1 text-[#F5B731]" />
      {message}
    </div>
  );
}
