'use client';

import { useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import { useEvaluasiForm } from '@/hooks/useEvaluasiForm';
import CoverScreen from './CoverScreen';
import FeedbackStep from './FeedbackStep';
import IdentityStep from './IdentityStep';
import TargetStep from './TargetStep';
import ThankYouScreen from './ThankYouScreen';
import WizardShell from './WizardShell';

export default function EvaluasiWizard() {
  const [messageApi, contextHolder] = message.useMessage();
  const w = useEvaluasiForm(messageApi);

  // pindah screen -> scroll ke atas
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [w.screen]);

  const anim =
    w.screen === 0 || w.screen === 4 ? 'animate-pop-in' : w.direction === 'forward' ? 'animate-in-right' : 'animate-in-left';

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3D6CA8',
          colorWarning: '#F5B731',
          colorText: '#234E8E',
          colorTextPlaceholder: '#9DBBD9',
          colorBorder: '#BFE0F7',
          borderRadius: 14,
          lineWidth: 1.5,
          controlHeightLG: 48,
          controlOutline: 'rgba(79,134,198,.22)',
          controlOutlineWidth: 4,
          fontSize: 16,
          fontFamily: 'var(--font-body), system-ui, sans-serif',
        },
        components: { Switch: { trackHeight: 30, trackMinWidth: 56, handleSize: 24 } },
      }}
    >
      {contextHolder}
      <WizardShell screen={w.screen}>
        <div key={w.screen} className={anim}>
          {w.screen === 0 && <CoverScreen onStart={w.start} />}
          {w.screen === 1 && (
            <TargetStep form={w.form} error={w.error} update={w.update} onBack={w.back} onNext={w.next} />
          )}
          {w.screen === 2 && (
            <FeedbackStep form={w.form} error={w.error} update={w.update} onBack={w.back} onNext={w.next} />
          )}
          {w.screen === 3 && (
            <IdentityStep
              form={w.form}
              loading={w.loading}
              error={w.error}
              update={w.update}
              setAnonymous={w.setAnonymous}
              onBack={w.back}
              onSubmit={w.handleSubmit}
            />
          )}
          {w.screen === 4 && <ThankYouScreen form={w.form} onReset={w.reset} />}
        </div>
      </WizardShell>
    </ConfigProvider>
  );
}
