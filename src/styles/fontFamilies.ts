import { Noto_Sans } from 'next/font/google';
import { Noto_Sans_KR } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const fontFamilies = {
  global: notoSansKr,
  primary: {
    en: notoSans,
    kr: notoSansKr,
  },
};
