import PitchValue from '@/modules/nnm';
import style from './index.module.scss';

import { OneOctavePiano } from './OneOctavePiano';

import type { KeyInfo } from './src/types';

type PianoProps = {
  keyInfos?: KeyInfo[];
};

export function Piano({ keyInfos = [] }: PianoProps) {
  const createPiano = () => {
    if (keyInfos.length === 0) return <OneOctavePiano />;

    const sortedKeyInfos = keyInfos.toSorted((a, b) => a.value - b.value);

    const startOctave = PitchValue.calcOctave(sortedKeyInfos[0].value);
    const endOctave = PitchValue.calcOctave(sortedKeyInfos[sortedKeyInfos.length - 1].value);

    const repeat = endOctave - startOctave + 1;

    const pianoData: KeyInfo[][] = [];
    for (let i = 0; i < repeat; i++) {
      pianoData.push([]);
    }
    sortedKeyInfos.forEach((keyInfo) => {
      const octave = PitchValue.calcOctave(keyInfo.value);
      const index = octave - startOctave;

      pianoData[index].push({ ...keyInfo, value: PitchValue.wrapToOctaveRange(keyInfo.value) });
    });

    return pianoData.map((data, i) => {
      return <OneOctavePiano key={i} keyInfos={data} />;
    });
  };

  return <div className={style.wrapper}>{createPiano()}</div>;
}
