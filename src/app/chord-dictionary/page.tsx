'use client';

import style from './page.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

import ChordCard from './_components/ChordCard';
import SearchPanel from './_components/SearchPanel';
import Chord, { ChordInfo } from '@/modules/chord';
import { produce } from 'immer';
import MathPlus from '@/modules/math-plus';
import { useState } from 'react';
import { RootNote } from '@/modules/mdm';
import Header from '@/app/_components/Header';

const namer = createSimpleClassNamer(style);

export default function Page() {
  const [rootNote, setRootNote] = useState<RootNote>('C');
  const [keyword, setKeyword] = useState('');
  const chords = Chord.dictionary.search(rootNote, keyword);
  const suggestionList = keyword.length === 0 ? [] : Chord.dictionary.suggestKeywords(keyword);

  const list = chords.reduce<ChordInfo[][]>((prev, chord, i) => {
    const rowIndex = MathPlus.calcQuotient(i, 4);

    return produce(prev, (draft) => {
      if (draft[rowIndex] === undefined) draft[rowIndex] = [];
      draft[rowIndex].push(chord);
    });
  }, []);

  const handleTypeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleSelectRootNote = (rootNote: RootNote) => {
    setRootNote(rootNote);
  };

  return (
    <section className={namer('wrapper')}>
      <Header currentPage="chord" />
      <section className={namer('contentsArea')}>
        <SearchPanel
          keyword={keyword}
          onTypeKeyword={handleTypeKeyword}
          rootNote={rootNote}
          onSelectRootNote={handleSelectRootNote}
          suggestionList={suggestionList}
        />
        <ul className={namer('chordCardList')}>
          {list.map((chords, i) => {
            return (
              <li key={i} className={namer('row')}>
                {chords.map((chord) => {
                  const { symbols, name, noteNumbers } = chord;
                  return (
                    <div key={name} className={namer('card-wrapper')}>
                      <ChordCard title={symbols[0]} subtitle={name} chordNumbers={noteNumbers} />
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
