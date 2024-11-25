import { NormalizedPitchValues } from './types';
import {
  alignNormalizedPitchValues,
  normalizePitchValues,
  shiftNormalizedPitchValues,
  unshiftNormalizedPitchValues,
} from './normalization';

///   alignNormalizedPitchValues   ///
describe('alignNormalizedPitchValues', () => {
  test('옥타브 시작점이 더 빠른 객체에 맞추어 정렬되어야 합니다.', () => {
    const earlyStartValues: NormalizedPitchValues = {
      startOctave: 2,
      values: [
        [1, 3, 4],
        [0, 5, 7],
      ],
    };

    const lateStartValues: NormalizedPitchValues = {
      startOctave: 5,
      values: [
        [4, 6, 8],
        [0, 3, 6],
      ],
    };

    const expectedEarlyStartValues: NormalizedPitchValues = {
      startOctave: 2,
      values: [
        [1, 3, 4],
        [0, 5, 7],
      ],
    };

    const expectedLateStartValues: NormalizedPitchValues = {
      startOctave: 2,
      values: [[], [], [], [4, 6, 8], [0, 3, 6]],
    };

    const [alignedEarlyStartValues, alignedLateStartValues] = alignNormalizedPitchValues(
      earlyStartValues,
      lateStartValues
    );

    expect(alignedEarlyStartValues).toEqual(expectedEarlyStartValues);
    expect(alignedLateStartValues).toEqual(expectedLateStartValues);
  });

  test('옥타브 시작점이 같을 때 올바르게 정렬해야합니다.', () => {
    const values1 = {
      startOctave: 4,
      values: [[0, 4, 7]],
    };

    const values2 = {
      startOctave: 4,
      values: [[0]],
    };

    const expectedValues1 = {
      startOctave: 4,
      values: [[0, 4, 7]],
    };

    const expectedValues2 = {
      startOctave: 4,
      values: [[0]],
    };

    const [alignedValues1, alignedValues2] = alignNormalizedPitchValues(values1, values2);
    expect(alignedValues1).toEqual(expectedValues1);
    expect(alignedValues2).toEqual(expectedValues2);
  });
});

///   shiftNormalizedPitchValues   ///
describe('shiftNormalizedPitchValues', () => {
  const normalizedPitchValues: NormalizedPitchValues = {
    startOctave: 3,
    values: [[], [], [4, 6, 8], [0, 3, 6]],
  };

  test('올바르게 옥타브 시작점을 뒤로 밀어야 합니다.', () => {
    const expectedAlignedValues1: NormalizedPitchValues = {
      startOctave: 5,
      values: [
        [4, 6, 8],
        [0, 3, 6],
      ],
    };

    const unshiftedValues1 = shiftNormalizedPitchValues(normalizedPitchValues, 2);
    expect(unshiftedValues1).toEqual(expectedAlignedValues1);

    const expectedAlignedValues2: NormalizedPitchValues = {
      startOctave: 7,
      values: [],
    };

    const unshiftedValues2 = shiftNormalizedPitchValues(normalizedPitchValues, 4);
    expect(unshiftedValues2).toEqual(expectedAlignedValues2);
  });
});

///   unshiftNormalizedPitchValues   ///
describe('unshiftNormalizedPitchValues', () => {
  const normalizedPitchValues: NormalizedPitchValues = {
    startOctave: 5,
    values: [
      [4, 6, 8],
      [0, 3, 6],
    ],
  };

  test('올바르게 옥타브 시작점을 앞당겨야 합니다.', () => {
    const expectedAlignedValues: NormalizedPitchValues = {
      startOctave: 2,
      values: [[], [], [], [4, 6, 8], [0, 3, 6]],
    };

    const unshiftedValues = unshiftNormalizedPitchValues(normalizedPitchValues, 3);

    expect(unshiftedValues).toEqual(expectedAlignedValues);
  });

  test('옥타브 시작점이 앞당겨지면서 생긴 빈배열의 참조값은 모두 달라야합니다.', () => {
    const unshiftedValues = unshiftNormalizedPitchValues(normalizedPitchValues, 2);
    expect(unshiftedValues.values[0]).not.toBe(unshiftedValues.values[1]);
  });
});

///   normalizePitchValues   ///
describe('normalizePitchValues', () => {
  test('올바르게 정규화해야 합니다.', () => {
    const values1 = [0, 4, 7];
    const normalizedPitchValues1 = normalizePitchValues(values1);

    const expectedValues1: NormalizedPitchValues = {
      startOctave: 4,
      values: [[0, 4, 7]],
    };

    expect(normalizedPitchValues1).toEqual(expectedValues1);

    const values2 = [-12, 12, 23];
    const normalizedPitchValues2 = normalizePitchValues(values2);

    const expectedValues2: NormalizedPitchValues = {
      startOctave: 3,
      values: [[0], [], [0, 11]],
    };

    expect(normalizedPitchValues2).toEqual(expectedValues2);
  });

  test('인자로 빈배열을 받았을 경우 기본값을 반환해야합니다.', () => {
    const emptyValues = normalizePitchValues([]);
    const defaultValues: NormalizedPitchValues = {
      startOctave: 4,
      values: [],
    };

    expect(emptyValues).toEqual(defaultValues);
  });
});
