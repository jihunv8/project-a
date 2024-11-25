import '../styles/globals.scss';

import type { Metadata } from 'next';
import { fontFamilys } from '@/styles/fontFamilys';

export const metadata: Metadata = {
  title: 'Project A',
  description: '음악 반주 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={fontFamilys.global.className}>
      <body>{children}</body>
    </html>
  );
}
