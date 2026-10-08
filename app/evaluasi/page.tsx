import type { Metadata } from 'next';
import EvaluasiWizard from '@/components/evaluasi/EvaluasiWizard';

export const metadata: Metadata = { title: 'Kotak Evaluasi' };

export default function EvaluasiPage() {
  return <EvaluasiWizard />;
}
