import { PianoBlackKey } from './BlackKey';
import { PianoWiteKey } from './PianoWiteKey';
import style from './index.module.scss';

import { KeyState } from '../src/types';

type PianoProps = {
  pressedKeys?: number[];
  highlightKeys?: number[];
};

export function OneOctavePiano({ pressedKeys = [], highlightKeys = [] }: PianoProps) {
  function validateKeyIds(keyIds: number[]) {
    keyIds.forEach((keyId) => {
      if (keyId < 0 || keyId > 11) throw new Error('OneOctavePiano의 Key의 id는 0 ~ 11사이의 값이여야 합니다.');
    });
  }

  validateKeyIds(pressedKeys);
  validateKeyIds(highlightKeys);

  const keyStates: KeyState[] = new Array(11).fill('default');

  function setKeyStates(state: KeyState, keyIds: number[]) {
    keyIds.forEach((keyId) => {
      keyStates[keyId] = state;
    });
  }

  setKeyStates('pressed', pressedKeys);
  setKeyStates('highlight', highlightKeys);

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
