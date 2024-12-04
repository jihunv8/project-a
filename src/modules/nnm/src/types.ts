/** 노트 번호, C4 = 60
 * |  number   | ... |  57  |  58  |  59  |  60  |  61  |  62  |  63  | ... |
 * | note name | ... |  A3  |  Bb3 |  B3  |  C4  |  Db4 |  D4  |  Eb4 | ... |
 */
export type NoteNumber = number;

export type OctaveRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** 변화표를 숫자값으로 나타낸 타입입니다. 음수는 flat, 양수는 sharp, 0은 아무변화표도 붇지 않았다는 의미입니다.
 * 예: -2 = double-flat, 1 = sharp
 */
export type AccidentalValue = number;

/** 음정 */
export type Interver = number;
