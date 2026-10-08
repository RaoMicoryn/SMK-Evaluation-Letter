import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { btnBlue, btnWhite } from './ui';

interface Props {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextIcon?: React.ReactNode;
  loading?: boolean;
}

export default function StepNav({ onBack, onNext, nextLabel = 'Lanjut', nextIcon, loading }: Props) {
  return (
    <div className="mt-5 flex gap-3 lg:mt-8 lg:justify-between">
      <Button className={`${btnWhite} !w-[38%] lg:!w-44`} icon={<ArrowLeftOutlined />} onClick={onBack} disabled={loading}>
        Kembali
      </Button>
      <Button className={`${btnBlue} flex-1 lg:!w-72 lg:!flex-none`} loading={loading} onClick={onNext} icon={nextIcon} iconPosition="end">
        {nextLabel}
        {!nextIcon && <ArrowRightOutlined />}
      </Button>
    </div>
  );
}
