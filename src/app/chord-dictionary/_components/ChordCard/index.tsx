import { Piano } from '@/app/_components/Piano';
import style from './index.module.scss';
import { fontFamilys } from '@/styles/fontFamilys';
import { PianoKeyData } from '@/app/_components/Piano/src/piano-data';

type ChordCardProps = {
  title: string;
  subtitle: string;
  chordNumbers: number[];
};

export default function ChordCard({ title, subtitle, chordNumbers }: ChordCardProps) {
  const keys: PianoKeyData[] = chordNumbers.map((number, i) => {
    if (i === 0) {
      return { number: number, state: 'highlight' };
    }
    return { number: number, state: 'pressed' };
  });

  return (
    <article className={style.wrapper}>
      <section className={`${style.header} ${fontFamilys.primary.en.className}`}>
        <h1 className={style.title}>{title}</h1>
        <h2 className={style.subtitle}>{subtitle}</h2>
      </section>
      <section className={style.body}>
        <Piano keys={keys} options={{ minTotalOctave: 2 }} />
      </section>
    </article>
  );
}
