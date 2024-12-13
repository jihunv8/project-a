import style from './page.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

import ChordCard from './_components/ChordCard';
import SearchPanel from './_components/SearchPanel';
import { dictionary } from '@/modules/chord/dictionary/src/utils';
import { produce } from 'immer';
import { ChordInfo } from '@/modules/chord/dictionary/src/types';
import MathPlus from '@/modules/math-plus';
import { useState } from 'react';
import { RootNote } from '@/modules/mdm';

const namer = createSimpleClassNamer(style);

export default function Page() {
  const [rootNote, setRootNote] = useState<RootNote>('C');
  const [keyword, setKeyword] = useState('m');
  const chords = dictionary.search(rootNote, keyword);

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
      <section className={namer('contentsArea')}>
        <SearchPanel
          keyword={keyword}
          onTypeKeyword={handleTypeKeyword}
          rootNote={rootNote}
          onSelectRootNote={handleSelectRootNote}
        />
        <ul className={namer('chordCardList')}>
          {list.map((chords, i) => {
            return (
              <li key={i} className={namer('row')}>
                {chords.map((chord) => {
                  const { symbols, name, noteNumbers } = chord;
                  return <ChordCard key={name} title={symbols[0]} subtitle={name} chordNumbers={noteNumbers} />;
                })}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
