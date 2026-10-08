'use client';

import { App, Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

// Hanya izinkan redirect ke path internal /admin (cegah open redirect)
const safeNext = (n: string | null) => (n && n.startsWith('/admin') && !n.startsWith('//') ? n : '/admin');

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ password }: { password: string }) => {
    setLoading(true);
    try {
      await axios.post('/api/v1/admin/login', { password });
      router.replace(safeNext(params.get('next')));
      router.refresh();
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : null;
      message.error(msg ?? 'Gagal masuk. Coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 16 }}>
      <Card style={{ width: 380, maxWidth: '100%' }} title="Masuk Admin · Kotak Evaluasi">
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Password wajib diisi' }]}>
            <Input.Password autoFocus autoComplete="current-password" maxLength={200} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Masuk
          </Button>
        </Form>
      </Card>
    </div>
  );
}
