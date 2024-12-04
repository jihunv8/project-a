import MathPlus from '@/modules/math-plus';
import { NoteNumber, OctaveRange } from './types';
import { OCTAVE } from './constants';

export function sortNoteNumbers(values: NoteNumber[]): NoteNumber[] {
  return values.toSorted(compareNoteNumber);
}

export function compareNoteNumber(a: NoteNumber, b: NoteNumber): NoteNumber {
  return a - b;
}

/** 0 ~ 11로 제한된 노트번호를 반환합니다. */
export function wrapToOctaveRange(noteNumber: NoteNumber): OctaveRange {
  const remainder = MathPlus.calcRmainder(noteNumber, OCTAVE);

  const wrappedNumber = noteNumber >= 0 ? remainder : (OCTAVE + remainder) % OCTAVE;

  return castOctaveRange(wrappedNumber);
}

/** 0 ~ 11사이의 수의 타입을 OctaveRange로 변환합니다.*/
export function castOctaveRange(number: number): OctaveRange {
  if (isInOctaveRange(number)) {
    return number;
  }

  throw new Error(`number ${number}은(는) OctaveRange의 수가 아닙니다.`);
}

/** 인수로 받은 수가 OctaveRange에 포함되는지 확인합니다.*/
export function isInOctaveRange(number: number): number is OctaveRange {
  return number >= 0 && number <= 11; // TwelveRange의 조건
}

/** 특정 옥타브와 특정 번호로 노트번호를 구합니다.*/
export function getInOctave(octave: number, numberInOctaveRange: OctaveRange) {
  return getMinInOctave(octave) + numberInOctaveRange;
}

/** 특정 옥타브의 최대 노트번호를 구합니다. */
export function getMaxInOctave(octave: number): NoteNumber {
  const min = getMinInOctave(octave);
  const max = min + OCTAVE - 1;
  return max;
}
/** 특정 옥타브의 최소 노트번호를 구합니다. */
export function getMinInOctave(octave: number): NoteNumber {
  const min = OCTAVE * (octave + 1);
  return min;
}

/** 노트번호의 옥타브를 구합니다.
 * C0의 번호 12번의 옥타브는 0입니다.
 * C4의 번호 60번의 옥타브는 4입니다.
 * Bb3의 번호 59번의 옥타브는 3입니다.
 */
export function getOctave(noteNumber: NoteNumber): number {
  if (noteNumber >= 0) {
    const quotient = MathPlus.calcQuotient(noteNumber, OCTAVE);
    return quotient - 1;
  }

  // 음수일때
  const targetNumber = noteNumber + 1;
  const quotient = MathPlus.calcQuotient(targetNumber, OCTAVE);
  return quotient - 2;
}
