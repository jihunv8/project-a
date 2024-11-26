import { PianoBlackKey } from './BlackKey';
import { PianoWiteKey } from './PianoWiteKey';
import style from './index.module.scss';

import { KeyState } from '../src/types';
import nnm, { NoteNumber } from '@/modules/nnm';

type PianoProps = {
  keyInfos?: {
    value: NoteNumber;
    state: KeyState;
  }[];
};

export function OneOctavePiano({ keyInfos = [] }: PianoProps) {
  keyInfos.forEach(({ value }) => {
    if (value < 0 || value > 11) throw new Error('OneOctavePiano의 KeyInfo의 value는 0 ~ 11사이의 값이여야 합니다.');
  });

  const keyStates: KeyState[] = new Array(nnm.OCTAVE).fill('default');
  keyInfos.forEach((keyInfo) => {
    keyStates[keyInfo.value] = keyInfo.state;
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
