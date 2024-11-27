import style from './page.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

import ChordCard from './_components/ChordCard';
import SearchPanel from './_components/SearchPanel';

const namer = createSimpleClassNamer(style);

export default function Page() {
  return (
    <section className={namer('wrapper')}>
      <section className={namer('contentsArea')}>
        <SearchPanel />
        <ul className={namer('chordCardList')}>
          <li className={namer('row')}>
            <ChordCard />
            <ChordCard />
            <ChordCard />
            <ChordCard />
          </li>
          <li className={namer('row')}>
            <ChordCard />
            <ChordCard />
            <ChordCard />
            <ChordCard />
          </li>
          <li className={namer('row')}>
            <ChordCard />
            <ChordCard />
            <ChordCard />
            <ChordCard />
          </li>
        </ul>
      </section>
    </section>
  );
}
