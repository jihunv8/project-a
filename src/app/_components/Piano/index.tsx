import { alignNormalizedPitchValueGroups, normalizePitchValueGroup } from '@/modules/pitch-value/pitchValue';
import { OneOctavePiano } from './OneOctavePiano';

import style from './index.module.scss';

type PianoProps = {
  octave?: number;
  pressedKeys?: number[];
  highlightKeys?: number[];
};

export function Piano({ octave = 1, pressedKeys = [], highlightKeys = [] }: PianoProps) {
  if (octave <= 0) {
    throw new Error('octave는 1이상이여야 합니다.');
  }

  const [normalizedPressed, normalizedHighlight] = alignNormalizedPitchValueGroups(
    normalizePitchValueGroup(pressedKeys),
    normalizePitchValueGroup(highlightKeys)
  );

  console.log(normalizedPressed);
  console.log(normalizedHighlight);

  const createPiano = (repeat: number) => {
    return Array.from({ length: repeat }, (_, i) => {
      const pressedKeys = normalizedPressed.values[i];
      const highlightKeys = normalizedHighlight.values[i];

      return <OneOctavePiano key={i} pressedKeys={pressedKeys} highlightKeys={highlightKeys} />;
    });
  };

  return <div className={style.wrapper}>{createPiano(octave)}</div>;
}
