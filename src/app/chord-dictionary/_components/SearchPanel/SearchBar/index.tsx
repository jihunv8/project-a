import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import Image from 'next/image';

const namer = createSimpleClassNamer(style);

export default function SearchBar() {
  return (
    <section className={namer('wrapper')}>
      <input placeholder="코드를 입력해주세요." />
      <button>
        <SearchIcon />
      </button>
    </section>
  );
}
