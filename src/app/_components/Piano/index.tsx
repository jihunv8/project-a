import PitchValue from '@/modules/pitch-value';
import { OneOctavePiano } from './OneOctavePiano';

import style from './index.module.scss';

type PianoProps = {
  pressedKeys?: number[];
  highlightKeys?: number[];
};

export function Piano({ pressedKeys = [], highlightKeys = [] }: PianoProps) {
  const [normalizedPressed, normalizedHighlight] = PitchValue.alignNormalizedPitchValues(
    PitchValue.normalizePitchValues(pressedKeys),
    PitchValue.normalizePitchValues(highlightKeys)
  );

  const createPiano = (repeat: number) => {
    if (repeat <= 0) repeat = 1;

    return Array.from({ length: repeat }, (_, i) => {
      const pressedKeys = normalizedPressed.values[i];
      const highlightKeys = normalizedHighlight.values[i];

      return <OneOctavePiano key={i} pressedKeys={pressedKeys} highlightKeys={highlightKeys} />;
    });
  };

  const repeat: number = Math.max(normalizedPressed.values.length, normalizedHighlight.values.length);

  return <div className={style.wrapper}>{createPiano(repeat)}</div>;
}
