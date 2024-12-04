import style from './index.module.scss';

import PianoDataModule, { PianoUnitData } from '@/app/_components/Piano/src/piano-data';

import PianoKey from './PianoKey';

type PianoUnitProps = {
  octave: PianoUnitData['octave'];
  keys?: PianoUnitData['keys'];
};

/** 12키로 구성된 피아노입니다.*/
export default function PianoUnit({ octave, keys = PianoDataModule.unit.createDefault(octave).keys }: PianoUnitProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.whiteKeyContainer}>
        <PianoKey number={keys[0].number} state={keys[0].state} />
        <PianoKey number={keys[2].number} state={keys[2].state} />
        <PianoKey number={keys[4].number} state={keys[4].state} />
        <PianoKey number={keys[5].number} state={keys[5].state} />
        <PianoKey number={keys[7].number} state={keys[7].state} />
        <PianoKey number={keys[9].number} state={keys[9].state} />
        <PianoKey number={keys[11].number} state={keys[11].state} />
      </div>
      <div className={style.blackKeyContainer}>
        <PianoKey type="black" number={keys[1].number} state={keys[1].state} />
        <PianoKey type="black" number={keys[3].number} state={keys[3].state} />
        <PianoKey type="black" number={keys[6].number} state={keys[6].state} />
        <PianoKey type="black" number={keys[8].number} state={keys[8].state} />
        <PianoKey type="black" number={keys[10].number} state={keys[10].state} />
      </div>
    </div>
  );
}
