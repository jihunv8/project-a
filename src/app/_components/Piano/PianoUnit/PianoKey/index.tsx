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

export default function PianoKey({ type = 'white', state = 'default' }: PianoBlackKeyProps) {
  return <div className={namer('wrapper', type, state)}></div>;
}
