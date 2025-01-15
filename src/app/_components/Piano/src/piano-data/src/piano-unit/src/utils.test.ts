import { createDefault, setKey, setOctave } from './utils';
import { PianoUnitData } from './types';
import PianoKeyDataModule from '../../key';
import Nnm from '@/modules/nnm';

const subjectUnits: PianoUnitData[] = [];
for (let octave = -3; octave <= 8; octave++) {
  const minNumber = Nnm.getMinInOctave(octave);
  subjectUnits.push({
    octave,
    keys: {
      0: PianoKeyDataModule.create(minNumber + 0, { state: 'default' }),
      1: PianoKeyDataModule.create(minNumber + 1, { state: 'default' }),
      2: PianoKeyDataModule.create(minNumber + 2, { state: 'default' }),
      3: PianoKeyDataModule.create(minNumber + 3, { state: 'default' }),
      4: PianoKeyDataModule.create(minNumber + 4, { state: 'default' }),
      5: PianoKeyDataModule.create(minNumber + 5, { state: 'default' }),
      6: PianoKeyDataModule.create(minNumber + 6, { state: 'default' }),
      7: PianoKeyDataModule.create(minNumber + 7, { state: 'default' }),
      8: PianoKeyDataModule.create(minNumber + 8, { state: 'default' }),
      9: PianoKeyDataModule.create(minNumber + 9, { state: 'default' }),
      10: PianoKeyDataModule.create(minNumber + 10, { state: 'default' }),
      11: PianoKeyDataModule.create(minNumber + 11, { state: 'default' }),
    },
  });
}

describe('createDefault', () => {
  test('올바르게 기본 피아노유닛을 생성해야 합니다.', () => {
    for (let octave = -3; octave <= 8; octave++) {
      const minNumber = Nnm.getMinInOctave(octave);
      const expected = {
        octave,
        keys: {
          0: PianoKeyDataModule.createDefault(minNumber + 0),
          1: PianoKeyDataModule.createDefault(minNumber + 1),
          2: PianoKeyDataModule.createDefault(minNumber + 2),
          3: PianoKeyDataModule.createDefault(minNumber + 3),
          4: PianoKeyDataModule.createDefault(minNumber + 4),
          5: PianoKeyDataModule.createDefault(minNumber + 5),
          6: PianoKeyDataModule.createDefault(minNumber + 6),
          7: PianoKeyDataModule.createDefault(minNumber + 7),
          8: PianoKeyDataModule.createDefault(minNumber + 8),
          9: PianoKeyDataModule.createDefault(minNumber + 9),
          10: PianoKeyDataModule.createDefault(minNumber + 10),
          11: PianoKeyDataModule.createDefault(minNumber + 11),
        },
      };

      const newDefaultUnit = createDefault(octave);
      expect(newDefaultUnit).toEqual(expected);
    }
  });
});
describe('setKey', () => {
  test('피아노유닛의 옥타브 범위에 밖의 키를 설정하려 할 때 에러가 발생해야 합니다.', () => {
    subjectUnits.forEach((subjectUnit) => {
      const { octave } = subjectUnit;
      const minNumber = Nnm.getMinInOctave(octave);
      const maxNumber = Nnm.getMaxInOctave(octave);

      for (let number = minNumber - 1; number > minNumber - 24; number--) {
        expect(() => {
          setKey(subjectUnit, { number, state: 'default' });
        }).toThrow();
      }

      for (let number = maxNumber + 1; number < maxNumber + 24; number++) {
        expect(() => {
          setKey(subjectUnit, { number, state: 'default' });
        }).toThrow();
      }
    });
  });

  test('키를 올바르게 수정해야 합니다.', () => {
    subjectUnits.forEach((subjectUnit) => {
      const { octave } = subjectUnit;
      const minNumber = Nnm.getMinInOctave(octave);
      const maxNumber = Nnm.getMaxInOctave(octave);

      for (let number = minNumber; number <= maxNumber; number++) {
        const settedUnit = setKey(subjectUnit, { number, state: 'highlight' });

        const index = Nnm.wrapToOctaveRange(number);
        expect(settedUnit.keys[index].number).toBe(Nnm.getInOctave(octave, index));
        expect(settedUnit.keys[index].state).toBe('highlight');
      }
    });
  });
});

describe('setOctave', () => {
  test('올바르게 옥타브를 수정하고, 키의 번호도 옥타브 범위에 맞게 조정해야 합니다.', () => {
    subjectUnits.forEach((unit) => {
      for (let octaveToSet = -3; octaveToSet <= 8; octaveToSet++) {
        const settedUnit = setOctave(unit, octaveToSet);

        for (let i = 0; i < 12; i++) {
          const octave = settedUnit.octave;
          const index = Nnm.castOctaveRange(i);
          const expectedNumber = Nnm.getInOctave(octave, index);
          expect(settedUnit.keys[index].number).toBe(expectedNumber);
        }
      }
    });
  });
});
