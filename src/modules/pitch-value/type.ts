/** C4를 0으로 시작하는 음을 나타내는 값입니다.
 * |  값   | ... | -3  | -4  | -5  |  0  |  1  |  2  |  3  | ... |
 * | 음이름 | ... | A3  | Bb3 | B3  | C4  | Db4 | D4  | Eb4 | ... |
 */
export type PitchValue = number;

/** 정규화된 음값의 집합입니다.*/
export type NormalizedPitchValueGroup = {
  startOctave: number;
  values: PitchValue[][];
};
