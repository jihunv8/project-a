import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import SearchIcon from '@/images/icons/search.svg';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

const namer = createSimpleClassNamer(style);

type SearchBarProps = {
  keyword?: string;
  onTypeKeyword?: (keyword: string) => void;
  suggestionList?: string[];
};
export default function SearchBar({ keyword = '', onTypeKeyword = () => {}, suggestionList = [] }: SearchBarProps) {
  // -1은 선택되지 않음을 의미함.
  const [selectedIndexOfSuggestion, setSelectedIndexOfSuggestion] = useState(-1);
  const [isOpenedSuggestionList, setIsOpenedSuggestionList] = useState(false);

  const _suggestionList = suggestionList.slice(0, 10);
  const selectedSuggestion = _suggestionList[selectedIndexOfSuggestion] ?? '';
  const isSuggested = isOpenedSuggestionList && _suggestionList.length > 0;

  // functions

  const moveToNextSuggestion = () => {
    setSelectedIndexOfSuggestion((prev) => {
      const next = prev + 1;
      if (next >= _suggestionList.length) return prev;
      return next;
    });
  };

  const moveToPrevSuggestion = () => {
    setSelectedIndexOfSuggestion((prev) => {
      const next = prev - 1;
      if (next < -1) return prev;
      return next;
    });
  };

  const openSuggestionList = () => {
    setIsOpenedSuggestionList(true);
  };

  const closeSuggestionList = () => {
    setIsOpenedSuggestionList(false);
    setSelectedIndexOfSuggestion(-1);
  };

  const typeKeyword = (keyword: string) => {
    openSuggestionList();
    onTypeKeyword(keyword);
    setSelectedIndexOfSuggestion(-1);
  };

  const typeKeywordBySuggestion = () => {
    if (selectedSuggestion.length === 0) return;
    typeKeyword(selectedSuggestion);
    closeSuggestionList();
  };

  // handlers

  const handleFocus = () => {
    openSuggestionList();
  };

  const handleBlur = () => {
    closeSuggestionList();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    typeKeyword(keyword);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const key = e.key;

    if (!(key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter')) return;
    e.preventDefault();

    switch (key) {
      case 'ArrowUp':
        moveToPrevSuggestion();
        return;

      case 'ArrowDown':
        moveToNextSuggestion();
        return;

      case 'Enter':
        typeKeywordBySuggestion();
        return;
    }
  };

  const createSelectSuggestedKeywordHandler = (keyword: string): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      setSelectedIndexOfSuggestion(-1);
      onTypeKeyword(keyword);
    };
  };

  return (
    <section className={namer('wrapper')} onFocus={handleFocus} onKeyDown={handleKeyDown} onBlur={handleBlur}>
      <section className={namer('input-area', [isSuggested, 'suggested'])}>
        <div className={namer('search-icon')}>
          <SearchIcon />
        </div>
        <input
          placeholder="코드특성을 입력해주세요."
          value={selectedSuggestion.length === 0 ? keyword : selectedSuggestion}
          onChange={handleChange}
        />
      </section>
      {isSuggested && (
        <section className={namer('suggested-keywords-area')}>
          <ul className={namer('suggested-keywords-list')}>
            {_suggestionList.map((suggestedKeyword, i) => {
              return (
                <li key={suggestedKeyword} className={namer('suggested-keyword')}>
                  <button
                    className={namer([i === selectedIndexOfSuggestion, 'selected'])}
                    onMouseDown={createSelectSuggestedKeywordHandler(suggestedKeyword)}
                  >
                    {suggestedKeyword}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </section>
  );
}
