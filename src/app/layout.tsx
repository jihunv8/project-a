import '../styles/globals.scss';

import type { Metadata } from 'next';
import { fontFamilies } from '@/styles/fontFamilies';

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
    <html lang="ko" className={fontFamilies.global.className}>
      <body>{children}</body>
    </html>
  );
}
