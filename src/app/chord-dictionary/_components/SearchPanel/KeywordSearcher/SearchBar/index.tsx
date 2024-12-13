import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import { ChangeEvent } from 'react';

const namer = createSimpleClassNamer(style);

type SearchBarProps = {
  keyword?: string;
  onTypeKeyword?: (keyword: string) => void;
};
export default function SearchBar({ keyword = '', onTypeKeyword = () => {} }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onTypeKeyword(keyword);
  };

  return (
    <section className={namer('wrapper')}>
      <input placeholder="코드를 입력해주세요." value={keyword} onChange={handleChange} />
      <button>
        <SearchIcon />
      </button>
    </section>
  );
}
