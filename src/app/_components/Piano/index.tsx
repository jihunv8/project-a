import Nnm from '@/modules/nnm';
import style from './index.module.scss';

import PianoUnit from './PianoUnit';

import PianoDataModule, { PianoData, PianoKeyData } from './src/piano-data';

type PianoProps = {
  keys?: PianoKeyData[];
  options?: {
    startOctave?: number;
    totalOctave?: number;
    minTotalOctave?: number;
  };
};

export function Piano({ keys = [], options: { startOctave, totalOctave, minTotalOctave } = {} }: PianoProps) {
  if (keys.length === 0) {
    const defaultStartOctave = startOctave ?? 4;
    const defaultStartNumber = Nnm.getInOctave(defaultStartOctave, 0);
    keys = [PianoDataModule.key.create(defaultStartNumber)];
  }

  const pianoData: PianoData = PianoDataModule.create(keys, { startOctave, totalOctave, minTotalOctave });

  return (
    <div className={style.wrapper}>
      {pianoData.units.map((unit) => {
        const { octave, keys } = unit;
        return <PianoUnit key={octave} octave={octave} keys={keys}></PianoUnit>;
      })}
    </div>
  );
}
