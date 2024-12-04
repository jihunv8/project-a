import { PianoData } from './types';
import { PianoKeyData } from '../src/key';
import { create } from './utils';
import PianoUnitDataModule from './piano-unit';

describe('create', () => {
  test('올바르게 생성해야 합니다.', () => {
    const keys: PianoKeyData[] = [
      { number: 69, state: 'highlight' },
      { number: 73, state: 'pressed' },
      { number: 76, state: 'pressed' },
      { number: 80, state: 'pressed' },
    ];

    const pianoData = create(keys);
    const expected: PianoData = {
      startOctave: 4,
      units: [
        PianoUnitDataModule.createByKeys(4, [keys[0]]),
        PianoUnitDataModule.createByKeys(5, [keys[1], keys[2], keys[3]]),
      ],
    };

    expect(pianoData).toEqual(expected);
  });
});
