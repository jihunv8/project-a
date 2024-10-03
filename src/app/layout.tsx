import type { Metadata } from 'next';

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
