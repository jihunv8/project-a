import nnm from '@/modules/nnm';
import style from './index.module.scss';

import { OneOctavePiano } from './OneOctavePiano';

import type { KeyInfo } from './src/types';

type PianoProps = {
  keyInfos?: KeyInfo[];
};

export function Piano({ keyInfos = [] }: PianoProps) {
  const createPiano = () => {
    if (keyInfos.length === 0) return <OneOctavePiano octave={4} />;

    const sortedKeyInfos = keyInfos.toSorted((a, b) => a.number - b.number);

    const startOctave = nnm.calcOctave(sortedKeyInfos[0].number);
    const endOctave = nnm.calcOctave(sortedKeyInfos[sortedKeyInfos.length - 1].number);

    const repeat = endOctave - startOctave + 1;

    const pianoData: KeyInfo[][] = [];
    for (let i = 0; i < repeat; i++) {
      pianoData.push([]);
    }

    sortedKeyInfos.forEach((keyInfo) => {
      const octave = nnm.calcOctave(keyInfo.number);
      const index = octave - startOctave;

      pianoData[index].push(keyInfo);
    });

    return pianoData.map((data, i) => {
      return <OneOctavePiano key={i} octave={startOctave + i} keyInfos={data} />;
    });
  };

  return <div className={style.wrapper}>{createPiano()}</div>;
}
