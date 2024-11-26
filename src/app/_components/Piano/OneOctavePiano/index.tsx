import { PianoBlackKey } from './BlackKey';
import { PianoWiteKey } from './PianoWiteKey';
import style from './index.module.scss';

import { KeyInfo, KeyState } from '../src/types';
import nnm from '@/modules/nnm';

type PianoProps = {
  octave: number;
  keyInfos?: KeyInfo[];
};

export function OneOctavePiano({ octave, keyInfos = [] }: PianoProps) {
  keyInfos.forEach(({ number }) => nnm.validateNoteNumberForOctave(number, octave));

  const keyStates: KeyState[] = new Array(nnm.OCTAVE).fill('default');
  keyInfos.forEach(({ number, state }) => {
    const index = nnm.wrapToOctaveRange(number);
    keyStates[index] = state;
  });

  return (
    <div className={style.wrapper}>
      <div className={style.whiteKeyContainer}>
        <PianoWiteKey state={keyStates[0]} />
        <PianoWiteKey state={keyStates[2]} />
        <PianoWiteKey state={keyStates[4]} />
        <PianoWiteKey state={keyStates[5]} />
        <PianoWiteKey state={keyStates[7]} />
        <PianoWiteKey state={keyStates[9]} />
        <PianoWiteKey state={keyStates[11]} />
      </div>
      <div className={style.blackKeyContainer}>
        <PianoBlackKey state={keyStates[1]} />
        <PianoBlackKey state={keyStates[3]} />
        <PianoBlackKey state={keyStates[6]} />
        <PianoBlackKey state={keyStates[8]} />
        <PianoBlackKey state={keyStates[10]} />
      </div>
    </div>
  );
}
