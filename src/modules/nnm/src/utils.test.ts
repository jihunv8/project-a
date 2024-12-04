import { NoteNumber } from '@/modules/nnm/external';
import { castOctaveRange, getInOctave, getOctave, isInOctaveRange, wrapToOctaveRange } from './utils';
// octave:[fromNoteNumber, toNoteNumber]
const octaveRangeTable: { [octave: string]: [NoteNumber, NoteNumber] } = {
  '-3': [-24, -11],
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

const minOctave = Object.keys(octaveRangeTable).reduce((min, key) => (Number(key) < min ? Number(key) : min), Infinity);
const maxOctave = Object.keys(octaveRangeTable).reduce(
  (max, key) => (Number(key) > max ? Number(key) : max),
  -Infinity
);
const minNoteNumber = octaveRangeTable[minOctave][0];
const maxNoteNumber = octaveRangeTable[maxOctave][1];

describe('wrapToOctaveRange', () => {
  test('반환된 값이 0 ~ 11사이의 값이여야 합니다.', () => {
    for (let i = -24; i < 120; i++) {
      const result = wrapToOctaveRange(i);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(11);
    }
  });

  test('올바른 값을 반환해야합니다.', () => {
    expect(wrapToOctaveRange(-13)).toBe(11);
    expect(wrapToOctaveRange(-12)).toBe(0);
    expect(wrapToOctaveRange(-11)).toBe(1);

    expect(wrapToOctaveRange(-2)).toBe(10);
    expect(wrapToOctaveRange(-1)).toBe(11);

    expect(wrapToOctaveRange(0)).toBe(0);
    expect(wrapToOctaveRange(1)).toBe(1);
    expect(wrapToOctaveRange(2)).toBe(2);

    expect(wrapToOctaveRange(10)).toBe(10);
    expect(wrapToOctaveRange(11)).toBe(11);

    expect(wrapToOctaveRange(12)).toBe(0);
    expect(wrapToOctaveRange(12)).toBe(0);
    expect(wrapToOctaveRange(13)).toBe(1);

    expect(wrapToOctaveRange(24)).toBe(0);
    expect(wrapToOctaveRange(25)).toBe(1);
  });
});

describe('getInOctave', () => {
  test('올바르른 값을 반환해야 합니다.', () => {
    for (let octave = minOctave; octave <= maxOctave; octave++) {
      for (let j = 0; j < 12; j++) {
        const numInOctaveRange = castOctaveRange(j);
        const noteNumber = getInOctave(octave, numInOctaveRange);
        expect(noteNumber).toBe(octaveRangeTable[octave][0] + numInOctaveRange);
      }
    }
  });
});

describe('getOctave', () => {
  test('올바른 값을 반환해야합니다.', () => {
    for (let noteNumber = minNoteNumber; noteNumber <= maxNoteNumber; noteNumber++) {
      const octave = getOctave(noteNumber);
      const [min, max] = octaveRangeTable[octave];

      expect(noteNumber).toBeGreaterThanOrEqual(min);
      expect(noteNumber).toBeLessThanOrEqual(max);
    }
  });
});
