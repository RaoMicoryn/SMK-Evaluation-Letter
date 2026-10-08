'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { MessageInstance } from 'antd/es/message/interface';
import {
  INITIAL_FORM,
  buildPayload,
  clearDraft,
  loadDraft,
  saveDraft,
  validateAll,
  validateStep,
  type EvaluasiFormData,
  type Screen,
} from '@/lib/evaluasi';

export interface FormError {
  id: number;
  message: string;
}

export function useEvaluasiForm(messageApi: MessageInstance) {
  const [screen, setScreen] = useState<Screen>(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [form, setForm] = useState<EvaluasiFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormError | null>(null);

  const hydrated = useRef(false);

  // Pulihkan draft sekali saat pertama dibuka (di effect, bukan di useState, supaya tidak hydration mismatch)
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setForm(draft.form);
      setScreen(draft.screen);
      messageApi.info('Draft sebelumnya dipulihkan. Lanjutkan ya!');
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave (debounce) setiap form / step berubah
  useEffect(() => {
    if (!hydrated.current) return;
    const t = setTimeout(() => saveDraft(form, screen), 400);
    return () => clearTimeout(t);
  }, [form, screen]);

  const fail = (message: string) => {
    setError({ id: Date.now(), message });
    messageApi.warning(message);
  };

  const update = useCallback(
    <K extends keyof EvaluasiFormData>(key: K, value: EvaluasiFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setError(null);
    },
    [],
  );

  // Anonim ON -> nama dikosongkan & input di-disable
  const setAnonymous = useCallback((isAnonymous: boolean) => {
    setForm((prev) => ({ ...prev, isAnonymous, name: isAnonymous ? '' : prev.name }));
  }, []);

  const go = (to: Screen, dir: 'forward' | 'back') => {
    setDirection(dir);
    setError(null);
    setScreen(to);
  };

  const start = () => go(1, 'forward');

  const back = () => {
    if (screen >= 1 && screen <= 3) go((screen - 1) as Screen, 'back');
  };

  const next = () => {
    if (screen !== 1 && screen !== 2) return;
    const msg = validateStep(screen, form);
    if (msg) return fail(msg);
    go((screen + 1) as Screen, 'forward');
  };

  const reset = () => {
    clearDraft();
    setForm(INITIAL_FORM);
    go(0, 'back');
  };

  const handleSubmit = async () => {
    const invalid = validateAll(form);
    if (invalid) {
      go(invalid.step, 'back');
      return fail(invalid.error);
    }

    setLoading(true);
    try {
      await axios.post('/api/v1/evaluations', buildPayload(form));
      clearDraft(); // sudah terkirim -> buang draft (penting di komputer sekolah bersama)
      messageApi.success('Evaluasi berhasil dikirim. Terima kasih!');
      go(4, 'forward');
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Gagal mengirim evaluasi. Coba lagi ya.';
      messageApi.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { screen, direction, form, loading, error, update, setAnonymous, start, back, next, reset, handleSubmit };
}
