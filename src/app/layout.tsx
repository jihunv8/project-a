import type { Metadata } from 'next';

import '../styles/globals.scss';

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
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
