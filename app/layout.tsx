import type { Metadata } from 'next';
import { Baloo_2, Caveat_Brush, Nunito } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

// Judul & label: rounded bold playful. Coretan tangan: marker. Isi teks: rounded sans ramah.
const display = Baloo_2({ subsets: ['latin'], variable: '--font-display' });
const hand = Caveat_Brush({ subsets: ['latin'], weight: '400', variable: '--font-hand' });
const body = Nunito({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = { title: 'Kotak Evaluasi' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${hand.variable} ${body.variable} font-body`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
