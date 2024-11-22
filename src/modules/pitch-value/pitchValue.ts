import MathPlus from '@/modules/math-plus';
import { NormalizedPitchValueGroup, PitchValue } from './type';

const OCTAVE: number = 12;
const BASE_OCTAVE: number = 4;

/** 두개의 정규화된 음값의 집합을 하나의 옥타브 시작점으로 정렬합니다. */
export function alignNormalizedPitchValueGroups(
  group1: NormalizedPitchValueGroup,
  group2: NormalizedPitchValueGroup
): [NormalizedPitchValueGroup, NormalizedPitchValueGroup] {
  const [earlyStartGroup, lateStartGroup] = [group1, group2].sort((a, b) => a.startOctave - b.startOctave);

  const gapOfStartOctave = lateStartGroup.startOctave - earlyStartGroup.startOctave;

  const unshiftedLateStartGroup: NormalizedPitchValueGroup = unshiftStartOctaveOfNormalizedPitchValueGroup(
    lateStartGroup,
    gapOfStartOctave
  );

  if (group1.startOctave <= group2.startOctave) {
    return [group1, unshiftedLateStartGroup];
  } else {
    return [unshiftedLateStartGroup, group2];
  }
}

/** 정규화된 음값의 집합의 옥타브 시작점을 앞으로 당깁니다. */
export function unshiftStartOctaveOfNormalizedPitchValueGroup(group: NormalizedPitchValueGroup, num: number) {
  if (num < 0) throw new Error('num은 0 이상이여야 합니다.');

  if (num === 0) return group;

  const newGroup: NormalizedPitchValueGroup = {
    startOctave: group.startOctave - num,
    values: [...group.values],
  };

  for (let i = 0; i < num; i++) {
    newGroup.values.unshift([]);
  }

  return newGroup;
}

/** 음값의 집합을 정규화합니다. */
export function normalizePitchValueGroup(values: PitchValue[]): NormalizedPitchValueGroup {
  const _values = [...values];
  _values.sort((a, b) => a - b);

  const startOctave = calcOctave(_values[0]);

  const normalizedPitchValues: NormalizedPitchValueGroup = {
    startOctave,
    values: [],
  };

  _values.forEach((value) => {
    const octave = calcOctave(value);
    const normalizedPitchValue = normalizePitchValue(value);

    const index = octave - startOctave;

    if (normalizedPitchValues.values[index] === undefined) normalizedPitchValues.values[index] = [];

    normalizedPitchValues.values[index].push(normalizedPitchValue);
  });

  for (let i = 0; i < normalizedPitchValues.values.length; i++) {
    if (normalizedPitchValues.values[i] === undefined) normalizedPitchValues.values[i] = [];
  }

  return normalizedPitchValues;
}

/** 기본 옥타브범위(0~11)로 제한된 음의 값을 반환합니다. */
export function normalizePitchValue(value: PitchValue): number {
  const remainder = MathPlus.calcRmainder(value, OCTAVE);
  if (value >= 0) {
    return remainder;
  } else {
    return (OCTAVE + remainder) % OCTAVE;
  }
}

/** 음의 값의 옥타브를 구합니다.
 * 값 0은 C4이기 때문에 값 0의 옥타브는 4입니다.
 * 값 -1은 Bb3이기 때문에 값 -1의 옥타브는 3입니다.
 */
export function calcOctave(value: PitchValue) {
  if (value >= 0) {
    const quotient = MathPlus.calcQuotient(value, OCTAVE);
    return quotient + BASE_OCTAVE;
  }

  // value가 음수일때
  const targetValue = value + 1;
  const abs = Math.abs(targetValue);
  const quotient = MathPlus.calcQuotient(abs, OCTAVE);
  return BASE_OCTAVE - quotient - 1;
}
