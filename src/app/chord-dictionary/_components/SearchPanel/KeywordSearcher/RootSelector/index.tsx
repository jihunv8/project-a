import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';
import { RootNote, BaseNoteName, Accidental, decomposeRootNote, composeRootNote } from '@/modules/mdm';

import CommonButton from '@/app/_components/buttons/CommonButton';
import { useState } from 'react';

const namer = createSimpleClassNamer(style);

type RootNoteSelectorProps = {
  rootNote?: RootNote;
  onSelect?: (root: RootNote) => void;
};

export default function RootNoteSelector({ rootNote = 'C', onSelect = () => {} }: RootNoteSelectorProps) {
  const [initBaseNoteName, initAccidental] = decomposeRootNote(rootNote);
  const [baseNoteName, setBaseNoteName] = useState(initBaseNoteName);
  const [accidental, setAccidental] = useState(initAccidental);

  const select = (baseNoteName: BaseNoteName, accidental: Accidental) => {
    const root: RootNote = composeRootNote(baseNoteName, accidental);
    onSelect(root);
  };

  const createClickNoteNameButtonHandler = (selectedBaseNoteName: BaseNoteName) => {
    return () => {
      select(selectedBaseNoteName, accidental);
      setBaseNoteName(selectedBaseNoteName);
    };
  };

  const createClickAccidentalButtonHandler = (selectedAccidental: Accidental) => {
    return () => {
      const next = accidental === selectedAccidental ? '' : selectedAccidental;

      select(baseNoteName, next);
      setAccidental(next);
    };
  };

  return (
    <section className={namer('wrapper')}>
      <section className={namer('root-buttons')}>
        <section className={namer('row')}>
          <CommonButton
            name="C"
            width="70px"
            toggled={baseNoteName === 'C'}
            onClick={createClickNoteNameButtonHandler('C')}
          />
          <CommonButton
            name="D"
            width="70px"
            toggled={baseNoteName === 'D'}
            onClick={createClickNoteNameButtonHandler('D')}
          />
          <CommonButton
            name="E"
            width="70px"
            toggled={baseNoteName === 'E'}
            onClick={createClickNoteNameButtonHandler('E')}
          />
          <CommonButton
            name="F"
            width="70px"
            toggled={baseNoteName === 'F'}
            onClick={createClickNoteNameButtonHandler('F')}
          />
        </section>
        <section className={namer('row')}>
          <CommonButton
            name="G"
            width="70px"
            toggled={baseNoteName === 'G'}
            onClick={createClickNoteNameButtonHandler('G')}
          />
          <CommonButton
            name="A"
            width="70px"
            toggled={baseNoteName === 'A'}
            onClick={createClickNoteNameButtonHandler('A')}
          />
          <CommonButton
            name="B"
            width="70px"
            toggled={baseNoteName === 'B'}
            onClick={createClickNoteNameButtonHandler('B')}
          />
        </section>
      </section>
      <div className={namer('divider')}></div>
      <section className={namer('accidental-buttons')}>
        <CommonButton name="#" toggled={accidental === '#'} onClick={createClickAccidentalButtonHandler('#')} />
        <CommonButton name="b" toggled={accidental === 'b'} onClick={createClickAccidentalButtonHandler('b')} />
      </section>
    </section>
  );
}
