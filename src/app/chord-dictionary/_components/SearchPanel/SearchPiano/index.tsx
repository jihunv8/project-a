import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import Image from 'next/image';
import { Piano } from '@/app/_components/Piano';

const namer = createSimpleClassNamer(style);

export default function SearchPiano() {
  return (
    <section className={namer('wrapper')}>
      <Piano
        keyInfos={[
          { number: 60, state: 'default' },
          { number: 72, state: 'default' },
          { number: 84, state: 'default' },
        ]}
      />
    </section>
  );
}
