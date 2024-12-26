'use client';

import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import { useState } from 'react';

import CommonButton from '@/app/_components/buttons/CommonButton';

import SearchPiano from './SearchPiano';
import KeywordSearcher from './KeywordSearcher';
import { RootNote } from '@/modules/mdm';

const namer = createSimpleClassNamer(style);

type SerachMode = 'keyword' | 'piano';

type SearchPanelProps = {
  defaultMode?: SerachMode;
  rootNote?: RootNote;
  onSelectRootNote?: (rootNote: RootNote) => void;
  keyword?: string;
  onTypeKeyword?: (keyword: string) => void;
  suggestedKeywords?: string[];
  onSelectSuggestedKeyword?: (suggestedKeyword: string) => void;
};

export default function SearchPanel({
  defaultMode = 'keyword',
  rootNote = 'C',
  onSelectRootNote = () => {},
  keyword = '',
  onTypeKeyword = () => {},
  suggestedKeywords = [],
  onSelectSuggestedKeyword = () => {},
}: SearchPanelProps) {
  const [mode, setMode] = useState<SerachMode>(defaultMode);

  const createChangeModeHandler = (mode: SerachMode) => {
    return () => {
      setMode(mode);
    };
  };

  const modeTable = {
    keyword: (
      <KeywordSearcher
        rootNote={rootNote}
        onSelectRootNote={onSelectRootNote}
        keyword={keyword}
        onTypeKeyword={onTypeKeyword}
        suggestedKeywords={suggestedKeywords}
        onSelectSuggestedKeyword={onSelectSuggestedKeyword}
      />
    ),
    piano: <SearchPiano />,
  };

  return (
    <section className={namer('wrapper')}>
      <section className={namer('serachModeSelector')}>
        <div className={namer('title')}>검색 방식</div>
        <CommonButton
          name="코드입력"
          onClick={createChangeModeHandler('keyword')}
          toggled={mode === 'keyword'}
          color="primary"
        />
        <CommonButton
          name="피아노"
          onClick={createChangeModeHandler('piano')}
          toggled={mode === 'piano'}
          color="primary"
        />
      </section>
      <section className={namer('inputPenel')}>{modeTable[mode]}</section>
    </section>
  );
}
