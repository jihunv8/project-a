'use client';

import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import { useState } from 'react';

import Button from './Button';
import SearchBar from './SearchBar';
import SearchPiano from './SearchPiano';

const namer = createSimpleClassNamer(style);

type SerachMode = 'notation' | 'piano';

type SearchPanelProps = {
  defaultMode?: SerachMode;
};

export default function SearchPanel({ defaultMode = 'notation' }: SearchPanelProps) {
  const [mode, setMode] = useState<SerachMode>(defaultMode);

  const createChangeModeHandler = (mode: SerachMode) => {
    return () => {
      setMode(mode);
    };
  };

  return (
    <section className={namer('wrapper')}>
      <section className={namer('serachModeSelector')}>
        <div className={namer('title')}>검색 방식</div>
        <Button name="코드입력" onChangeMode={createChangeModeHandler('notation')} active={mode === 'notation'} />
        <Button name="피아노" onChangeMode={createChangeModeHandler('piano')} active={mode === 'piano'} />
      </section>
      <section className={namer('inputPenel')}>{{ notation: <SearchBar />, piano: <SearchPiano /> }[mode]}</section>
    </section>
  );
}
