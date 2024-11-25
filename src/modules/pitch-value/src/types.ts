/** C4를 0으로 시작하는 음을 나타내는 값입니다.
 * |  값   | ... | -3  | -4  | -5  |  0  |  1  |  2  |  3  | ... |
 * | 음이름 | ... | A3  | Bb3 | B3  | C4  | Db4 | D4  | Eb4 | ... |
 */
export type PitchValue = number;

/** 정규화된 피치값입니다.*/
export type NormalizedPitchValues = {
  startOctave: number;
  values: PitchValue[][];
};

/** 변화표를 숫자값으로 나타낸 타입입니다. 음수는 flat, 양수는 sharp, 0은 아무변화표도 붇지 않았다는 의미입니다.
 * 예: -2 = double-flat, 1 = sharp
 */
export type AccidentalValue = number;

export type Interver = number;
