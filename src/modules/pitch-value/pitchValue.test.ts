import { NormalizedPitchValueGroup } from './type';
import {
  alignNormalizedPitchValueGroups,
  calcOctave,
  normalizePitchValue,
  normalizePitchValueGroup,
  unshiftStartOctaveOfNormalizedPitchValueGroup,
} from './pitchValue';

describe('alignNormalizedPitchValueGroups', () => {
  test('올바르게 정렬해야합니다.', () => {
    const testData: {
      group1: { base: NormalizedPitchValueGroup; expected: NormalizedPitchValueGroup };
      group2: { base: NormalizedPitchValueGroup; expected: NormalizedPitchValueGroup };
    }[] = [
      {
        group1: {
          base: {
            startOctave: 2,
            values: [
              [1, 3, 4],
              [0, 5, 7],
            ],
          },
          expected: {
            startOctave: 2,
            values: [
              [1, 3, 4],
              [0, 5, 7],
            ],
          },
        },
        group2: {
          base: {
            startOctave: 5,
            values: [
              [4, 6, 8],
              [0, 3, 6],
            ],
          },
          expected: {
            startOctave: 2,
            values: [[], [], [], [4, 6, 8], [0, 3, 6]],
          },
        },
      },

      // 두 그룹이 옥타브 시작점이 같을 때
      {
        group1: {
          base: {
            startOctave: 4,
            values: [[0, 4, 7]],
          },
          expected: {
            startOctave: 4,
            values: [[0, 4, 7]],
          },
        },
        group2: {
          base: {
            startOctave: 4,
            values: [[0]],
          },
          expected: {
            startOctave: 4,
            values: [[0]],
          },
        },
      },
    ];

    testData.forEach(({ group1, group2 }) => {
      const [alignedGroup1, alignedGroup2] = alignNormalizedPitchValueGroups(group1.base, group2.base);

      expect(alignedGroup1).toEqual(group1.expected);
      expect(alignedGroup2).toEqual(group2.expected);
    });
  });
});

describe('unshiftStartOctaveOfNormalizedPitchValueGroup', () => {
  const group: NormalizedPitchValueGroup = {
    startOctave: 5,
    values: [
      [4, 6, 8],
      [0, 3, 6],
    ],
  };

  test('올바르게 옥타브 시작점을 앞당겨야 합니다.', () => {
    const expectedAlignedGroup: NormalizedPitchValueGroup = {
      startOctave: 2,
      values: [[], [], [], [4, 6, 8], [0, 3, 6]],
    };

    const unshiftedGroup = unshiftStartOctaveOfNormalizedPitchValueGroup(group, 3);

    expect(unshiftedGroup).toEqual(expectedAlignedGroup);
  });

  test('옥타브 시작점이 앞당겨지면서 생긴 빈배열의 참조값은 모두 달라야합니다.', () => {
    const unshiftedGroup = unshiftStartOctaveOfNormalizedPitchValueGroup(group, 2);
    expect(unshiftedGroup.values[0]).not.toBe(unshiftedGroup.values[1]);
  });
});

describe('normalizePitchValueGroup', () => {
  test('올바르게 정규화해야 합니다.', () => {
    const values1 = [0, 4, 7];
    const normalizedPitchValueGroup1 = normalizePitchValueGroup(values1);

    const expectedGroup1: NormalizedPitchValueGroup = {
      startOctave: 4,
      values: [[0, 4, 7]],
    };

    expect(normalizedPitchValueGroup1).toEqual(expectedGroup1);

    const values2 = [-12, 12, 23];
    const normalizedPitchValueGroup2 = normalizePitchValueGroup(values2);

    const expectedGroup2: NormalizedPitchValueGroup = {
      startOctave: 3,
      values: [[0], [], [0, 11]],
    };

    expect(normalizedPitchValueGroup2).toEqual(expectedGroup2);
  });
});

describe('normalizePitchValue', () => {
  test('반환된 값이 0 ~ 11사이의 값이여야 한다.', () => {
    for (let i = -100; i <= 100; i++) {
      const result = normalizePitchValue(i);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(11);
    }
  });

  test('올바른 값을 반환해야한다.', () => {
    expect(normalizePitchValue(-13)).toBe(11);
    expect(normalizePitchValue(-12)).toBe(0);
    expect(normalizePitchValue(-11)).toBe(1);

    expect(normalizePitchValue(-2)).toBe(10);
    expect(normalizePitchValue(-1)).toBe(11);

    expect(normalizePitchValue(0)).toBe(0);
    expect(normalizePitchValue(1)).toBe(1);
    expect(normalizePitchValue(2)).toBe(2);

    expect(normalizePitchValue(10)).toBe(10);
    expect(normalizePitchValue(11)).toBe(11);

    expect(normalizePitchValue(12)).toBe(0);
    expect(normalizePitchValue(13)).toBe(1);

    expect(normalizePitchValue(24)).toBe(0);
    expect(normalizePitchValue(25)).toBe(1);
  });
});

describe('calcOctave', () => {
  test('올바른 값을 반환해야합니다.', () => {
    expect(calcOctave(0)).toBe(4);
    expect(calcOctave(1)).toBe(4);
    expect(calcOctave(10)).toBe(4);
    expect(calcOctave(11)).toBe(4);

    expect(calcOctave(12)).toBe(5);
    expect(calcOctave(13)).toBe(5);
    expect(calcOctave(22)).toBe(5);
    expect(calcOctave(23)).toBe(5);

    expect(calcOctave(24)).toBe(6);
    expect(calcOctave(35)).toBe(6);

    expect(calcOctave(-1)).toBe(3);
    expect(calcOctave(-2)).toBe(3);
    expect(calcOctave(-11)).toBe(3);
    expect(calcOctave(-12)).toBe(3);

    expect(calcOctave(-13)).toBe(2);
    expect(calcOctave(-24)).toBe(2);
  });
});
