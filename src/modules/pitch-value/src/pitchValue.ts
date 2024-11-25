import MathPlus from '@/modules/math-plus';
import { PitchValue } from './types';
import { OCTAVE, DEFAULT_OCTAVE } from './constants';

/** 기본 옥타브범위(0~11)로 제한된 피치값을 반환합니다. */
export function wrapToOctaveRange(value: PitchValue): number {
  const remainder = MathPlus.calcRmainder(value, OCTAVE);
  if (value >= 0) {
    return remainder;
  } else {
    return (OCTAVE + remainder) % OCTAVE;
  }
}

/** 피치값의 옥타브를 구합니다.
 * 값 0은 C4이기 때문에 값 0의 옥타브는 4입니다.
 * 값 -1은 Bb3이기 때문에 값 -1의 옥타브는 3입니다.
 */
export function calcOctave(value: PitchValue) {
  if (value >= 0) {
    const quotient = MathPlus.calcQuotient(value, OCTAVE);
    return quotient + DEFAULT_OCTAVE;
  }

  // value가 음수일때
  const targetValue = value + 1;
  const abs = Math.abs(targetValue);
  const quotient = MathPlus.calcQuotient(abs, OCTAVE);
  return DEFAULT_OCTAVE - quotient - 1;
}
