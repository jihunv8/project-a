import MathPlus from '@/modules/math-plus';
import { NoteNumber } from './types';
import { OCTAVE } from './constants';

export function sortNoteNumbers(values: NoteNumber[]): NoteNumber[] {
  return values.toSorted(compareNoteNumber);
}

export function compareNoteNumber(a: NoteNumber, b: NoteNumber): NoteNumber {
  return a - b;
}

/** 한 옥타브범위(0~11)로 제한된 노트번호를 반환합니다. */
export function wrapToOctaveRange(noteNumber: NoteNumber): NoteNumber {
  const remainder = MathPlus.calcRmainder(noteNumber, OCTAVE);
  if (noteNumber >= 0) {
    return remainder;
  } else {
    return (OCTAVE + remainder) % OCTAVE;
  }
}

/** 노트번호의 옥타브를 구합니다.
 * C0의 번호 12번의 옥타브는 0입니다.
 * C4의 번호 60번의 옥타브는 4입니다.
 * Bb3의 번호 59번의 옥타브는 3입니다.
 */
export function calcOctave(noteNumber: NoteNumber) {
  if (noteNumber >= 0) {
    const quotient = MathPlus.calcQuotient(noteNumber, OCTAVE);
    return quotient - 1;
  }

  // 음수일때
  const targetNumber = noteNumber + 1;
  const quotient = MathPlus.calcQuotient(targetNumber, OCTAVE);
  return quotient - 2;
}
