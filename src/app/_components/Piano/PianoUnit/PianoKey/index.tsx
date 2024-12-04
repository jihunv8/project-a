import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

import { PianoKeyState } from '../../src/piano-data';
import { NoteNumber } from '@/modules/nnm';

const namer = createSimpleClassNamer(style);

type PianoBlackKeyProps = {
  number: NoteNumber;
  type?: 'white' | 'black';
  state?: PianoKeyState;
};

export default function PianoKey({ number, type = 'white', state = 'default' }: PianoBlackKeyProps) {
  let className = style.wrapper;

  switch (state) {
    case 'highlight':
      className += ' ' + style.highlight;
      break;

    case 'pressed':
      className += ' ' + style.pressed;
      break;
  }

  return <div className={namer('wrapper', type, state)}></div>;
}
