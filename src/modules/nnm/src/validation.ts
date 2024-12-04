import { NoteNumber } from './types';
import { getMaxInOctave, getMinInOctave } from './utils';

/** 노트번호가 특정 옥타브의 범위에 포함되는지 검사합니다.*/
export function validateNoteNumberForOctave(number: NoteNumber, octave: number) {
  const min = getMinInOctave(octave);
  const max = getMaxInOctave(octave);

  if (number < min || number > max) {
    throw new Error(`노트번호 ${number}은(는) ${octave}옥타브의 범위 ${min} ~ ${max}사이에 포함되지 않습니다.`);
  }
}
