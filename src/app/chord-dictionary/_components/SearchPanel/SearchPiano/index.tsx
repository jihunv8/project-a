import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import Image from 'next/image';
import { Piano } from '@/app/_components/Piano';

const namer = createSimpleClassNamer(style);

export default function SearchPiano() {
  return (
    <section className={namer('wrapper')}>
      <Piano options={{ startOctave: 3, totalOctave: 4 }} />
    </section>
  );
}
