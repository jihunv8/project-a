import { NoteNumber } from './types';
import { calcOctaveRange } from './utils';

/** 노트번호가 특정 옥타브의 범위에 포함되는지 검사합니다.*/
export function validateNoteNumberForOctave(number: NoteNumber, octave: number) {
  const [min, max] = calcOctaveRange(octave);

  if (number < min || number > max) {
    throw new Error(`${number}은(는) octave ${octave}의 범위인 ${min} ~ ${max}사이의 값이 아닙니다.`);
  }
}
