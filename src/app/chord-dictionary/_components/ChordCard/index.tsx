import { Piano } from '@/app/_components/Piano';
import style from './index.module.scss';
import { fontFamilys } from '@/styles/fontFamilys';

export default function ChordCard() {
  return (
    <article className={style.wrapper}>
      <section className={`${style.header} ${fontFamilys.primary.en.className}`}>
        <h1 className={style.title}>AM7</h1>
        <h2 className={style.subtitle}>Major7th</h2>
      </section>
      <section className={style.body}>
        <Piano
          keyInfos={[
            { number: 9, state: 'highlight' },
            { number: 13, state: 'pressed' },
            { number: 16, state: 'pressed' },
            { number: 18, state: 'pressed' },
          ]}
        />
      </section>
    </article>
  );
}
