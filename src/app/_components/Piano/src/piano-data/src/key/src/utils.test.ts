import {
  compare,
  create,
  createDefault,
  getMaxNoteNumber,
  getMaxOctave,
  getMinNoteNumber,
  getMinOctave,
  getOctave,
  getTotalOctave,
  sort,
} from './utils';
import { PianoKeyData } from './types';
import { pianoKeys } from './fixture';

describe('for keys', () => {
  describe('getTotalOctave', () => {
    test('인수로 빈배열을 받았을 때 0을 반환해야합니다.', () => {
      expect(getTotalOctave([])).toBe(0);
    });

    test('총 옥타브의 수를 반환해야합니다.', () => {
      expect(getTotalOctave(pianoKeys)).toBe(3);
    });
  });
  describe('getMaxOctave', () => {
    test('인수로 빈배열을 받았을 때 예외를 발생시켜야 합니다.', () => {
      expect(() => getMaxOctave([])).toThrow();
    });

    test('가장 큰 옥타브를 반환해야합니다.', () => {
      expect(getMaxOctave(pianoKeys)).toBe(5);
    });
  });
  describe('getMinOctave', () => {
    test('인수로 빈배열을 받았을 때 예외를 발생시켜야 합니다.', () => {
      expect(() => getMinOctave([])).toThrow();
    });

    test('가장 작은 옥타브를 반환해야합니다.', () => {
      expect(getMinOctave(pianoKeys)).toBe(3);
    });
  });
  describe('getMaxNoteNumber', () => {
    test('인수로 빈배열을 받았을 때 예외를 발생시켜야 합니다.', () => {
      expect(() => getMaxNoteNumber([])).toThrow();
    });
    test('가장 큰 키번호를 반환해야합니다.', () => {
      expect(getMaxNoteNumber(pianoKeys)).toBe(79);
    });
  });
  describe('getMinNoteNumber', () => {
    test('인수로 빈배열을 받았을 때 예외를 발생시켜야 합니다.', () => {
      expect(() => getMinNoteNumber([])).toThrow();
    });

    test('가장 작은 키번호를 반환해야합니다.', () => {
      expect(getMinNoteNumber(pianoKeys)).toBe(49);
    });
  });

  describe('sort', () => {
    test('number를 기준으로 올바르게 정렬해야합니다.', () => {
      const keys: PianoKeyData[] = [
        { number: 0, state: 'default' },
        { number: 2, state: 'pressed' },
        { number: 1, state: 'highlight' },
        { number: 3, state: 'pressed' },
        { number: 5, state: 'default' },
        { number: 4, state: 'default' },
      ];

      const expectedKeys: PianoKeyData[] = [
        { number: 0, state: 'default' },
        { number: 1, state: 'highlight' },
        { number: 2, state: 'pressed' },
        { number: 3, state: 'pressed' },
        { number: 4, state: 'default' },
        { number: 5, state: 'default' },
      ];

      const sortedKeys = sort(keys);

      expect(sortedKeys).toEqual(expectedKeys);
    });
  });
});

describe('for key', () => {
  describe('createDefault', () => {
    test('올바른 기본값을 생성해야 합니다.', () => {
      for (let i = -24; i < 108; i++) {
        const newKey = createDefault(i);
        expect(newKey.number).toBe(i);
        expect(newKey.state).toBe('default');
      }
    });
  });

  describe('create', () => {
    test('하나의 인수만 받았을 때 올바르게 생성해야합니다.', () => {
      for (let i = -24; i < 108; i++) {
        const newKey = createDefault(i);
        expect(newKey.number).toBe(i);
        expect(newKey.state).toBe('default');
      }
    });

    test('두번째 인수를 반았을 때 올바르게 설정된 PianoKeyData를 생성해야합니다.', () => {
      let subject: PianoKeyData;

      subject = create(60, { state: 'default' });
      expect(subject.number).toBe(60);
      expect(subject.state).toBe('default');

      subject = create(60, { state: 'highlight' });
      expect(subject.number).toBe(60);
      expect(subject.state).toBe('highlight');

      subject = create(60, { state: 'pressed' });
      expect(subject.number).toBe(60);
      expect(subject.state).toBe('pressed');
    });
  });
  describe('getOctave', () => {
    test('올바른 값을 반환해야합니다.', () => {
      // octave:[from, to]
      const octaveRangeTable: { [octave: string]: [number, number] } = {
        '-2': [-12, -1],
        '-1': [0, 11],
        '0': [12, 23],
        '1': [24, 35],
        '2': [36, 47],
        '3': [48, 59],
        '4': [60, 71],
        '5': [72, 83],
        '6': [84, 95],
        '7': [96, 107],
        '8': [108, 119],
      };

      for (let i = -12; i < 120; i++) {
        const key: PianoKeyData = {
          number: i,
          state: 'default',
        };

        const octave = getOctave(key);
        const [min, max] = octaveRangeTable[octave];

        expect(key.number).toBeGreaterThanOrEqual(min);
        expect(key.number).toBeLessThanOrEqual(max);
      }
    });
  });

  describe('compare', () => {
    const keys: PianoKeyData[] = [
      { number: 49, state: 'default' },
      { number: 60, state: 'default' },
      { number: 60, state: 'default' },
    ];
    test('피아노키 a와 b가 있을 때 피아노키 번호를 기준으로 비교해야합니다. a가 b보다 크다면 양수, 작다면 음수, 같으면 0을 반환해야 합니다. ', () => {
      let a: PianoKeyData;
      let b: PianoKeyData;

      // a > b
      a = keys[1];
      b = keys[0];
      expect(compare(a, b)).toBeGreaterThan(0);

      // a === b
      a = keys[1];
      b = keys[2];
      expect(compare(a, b)).toBe(0);

      // a < b
      a = keys[0];
      b = keys[1];
      expect(compare(a, b)).toBeLessThan(0);
    });
  });
});
