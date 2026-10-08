'use client';

import { App, Button, ConfigProvider } from 'antd';
import idID from 'antd/locale/id_ID';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === '/admin/login';

  const logout = async () => {
    try {
      await axios.post('/api/v1/admin/logout');
    } finally {
      router.replace('/admin/login');
    }
  };

  return (
    <ConfigProvider
      locale={idID}
      theme={{ token: { colorPrimary: '#244F8F', fontFamily: 'var(--font-body), system-ui, sans-serif' } }}
    >
      <App>
        <div style={{ minHeight: '100vh', background: '#F4F8FC' }}>
          {!isLogin && (
            <header
              style={{
                background: '#fff',
                borderBottom: '1px solid #DCE9F6',
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <strong style={{ fontSize: 18 }}>Kotak Evaluasi · Admin</strong>
              <Button onClick={logout}>Keluar</Button>
            </header>
          )}
          {children}
        </div>
      </App>
    </ConfigProvider>
  );
}
