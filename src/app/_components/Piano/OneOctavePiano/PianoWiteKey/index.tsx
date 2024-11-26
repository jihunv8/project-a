import { KeyState } from '../../src/types';
import style from './index.module.scss';

type PianoWiteKeyProps = {
  state?: KeyState;
};

export function PianoWiteKey({ state = 'default' }: PianoWiteKeyProps) {
  let className = style.wrapper;

  switch (state) {
    case 'highlight':
      className += ' ' + style.highlight;
      break;

    case 'pressed':
      className += ' ' + style.pressed;
      break;
  }

  return <div className={className}></div>;
}
