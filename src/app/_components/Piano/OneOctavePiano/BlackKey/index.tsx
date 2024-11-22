import style from './index.module.scss';
import { KeyState } from '../../src/types';

type PianoBlackKeyProps = {
  state?: KeyState;
};

export function PianoBlackKey({ state }: PianoBlackKeyProps) {
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
