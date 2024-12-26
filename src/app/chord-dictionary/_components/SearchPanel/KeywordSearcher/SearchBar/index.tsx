import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import { ChangeEvent, useState } from 'react';

const namer = createSimpleClassNamer(style);

type SearchBarProps = {
  keyword?: string;
  onTypeKeyword?: (keyword: string) => void;
  suggestedKeywords?: string[];
  onSelectSuggestedKeyword?: (suggestedKeyword: string) => void;
};
export default function SearchBar({
  keyword = '',
  onTypeKeyword = () => {},
  suggestedKeywords = [],
  onSelectSuggestedKeyword = () => {},
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const _suggestedKeywords = suggestedKeywords.slice(0, 10);
  const isSuggested = suggestedKeywords.length !== 0;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onTypeKeyword(keyword);
  };

  const createSelectSuggestedKeywordHandler = (keyword: string): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      onSelectSuggestedKeyword(keyword);
    };
  };

  return (
    <section className={namer('wrapper')} onFocus={handleFocus} onBlur={handleBlur}>
      <section className={namer('input-area', [isSuggested && isFocused, 'suggested'])}>
        <div className={namer('search-icon')}>
          <SearchIcon />
        </div>
        <input placeholder="코드를 입력해주세요." value={keyword} onChange={handleChange} />
      </section>
      {isSuggested && isFocused && (
        <section className={namer('suggested-keywords-area')}>
          <ul className={namer('suggested-keywords-list')}>
            {_suggestedKeywords.map((suggestedKeyword) => {
              return (
                <li key={suggestedKeyword} className={namer('suggested-keyword')}>
                  <button onClick={createSelectSuggestedKeywordHandler(suggestedKeyword)}>{suggestedKeyword}</button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
}
