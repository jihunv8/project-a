import { calcOctave, wrapToOctaveRange } from './pitchValue';
import { NormalizedPitchValues, PitchValue } from './types';
import { DEFAULT_OCTAVE } from './constants';

/** 두개의 정규화된 음값의 집합을 하나의 옥타브 시작점으로 정렬합니다. */
export function alignNormalizedPitchValues(
  values1: NormalizedPitchValues,
  values2: NormalizedPitchValues
): [NormalizedPitchValues, NormalizedPitchValues] {
  const [earlyStartValues, lateStartValues] = [values1, values2].sort((a, b) => a.startOctave - b.startOctave);

  const gapOfStartOctave = lateStartValues.startOctave - earlyStartValues.startOctave;

  const unshiftedLateStartValues: NormalizedPitchValues = unshiftNormalizedPitchValues(
    lateStartValues,
    gapOfStartOctave
  );

  if (values1.startOctave <= values2.startOctave) {
    return [values1, unshiftedLateStartValues];
  } else {
    return [unshiftedLateStartValues, values2];
  }
}

/** 정규화된 피치값의 옥타브 시작점을 뒤로 밉니다. */
export function shiftNormalizedPitchValues(normalizedPitchValues: NormalizedPitchValues, num: number) {
  if (num < 0) throw new Error('num은 0 이상이여야 합니다.');

  if (num === 0) return normalizedPitchValues;

  const newValues: NormalizedPitchValues = {
    startOctave: normalizedPitchValues.startOctave + num,
    values: [...normalizedPitchValues.values],
  };

  for (let i = 0; i < num; i++) {
    newValues.values.shift();
  }

  return newValues;
}

/** 정규화된 피치값의 옥타브 시작점을 앞으로 당깁니다. */
export function unshiftNormalizedPitchValues(normalizedPitchValues: NormalizedPitchValues, num: number) {
  if (num < 0) throw new Error('num은 0 이상이여야 합니다.');

  if (num === 0) return normalizedPitchValues;

  const newValues: NormalizedPitchValues = {
    startOctave: normalizedPitchValues.startOctave - num,
    values: [...normalizedPitchValues.values],
  };

  for (let i = 0; i < num; i++) {
    newValues.values.unshift([]);
  }

  return newValues;
}

/** 피치값을 정규화합니다. */
export function normalizePitchValues(values: PitchValue[]): NormalizedPitchValues {
  if (values.length === 0) {
    const DEFAULT_NORMALIZED_PITCH_VALUE = {
      startOctave: DEFAULT_OCTAVE,
      values: [],
    };

    return DEFAULT_NORMALIZED_PITCH_VALUE;
  }

  const _values = [...values];
  _values.sort((a, b) => a - b);

  const startOctave = calcOctave(_values[0]);

  const normalizedPitchValues: NormalizedPitchValues = {
    startOctave,
    values: [],
  };

  _values.forEach((value) => {
    const octave = calcOctave(value);
    const wrappedPitchValue = wrapToOctaveRange(value);

    const index = octave - startOctave;

    if (normalizedPitchValues.values[index] === undefined) normalizedPitchValues.values[index] = [];

    normalizedPitchValues.values[index].push(wrappedPitchValue);
  });

  for (let i = 0; i < normalizedPitchValues.values.length; i++) {
    if (normalizedPitchValues.values[i] === undefined) normalizedPitchValues.values[i] = [];
  }

  return normalizedPitchValues;
}
