import { calcOctave, wrapToOctaveRange } from './utils';

///   wrapToOctaveRange   ///
describe('wrapToOctaveRange', () => {
  test('반환된 값이 0 ~ 11사이의 값이여야 합니다.', () => {
    for (let i = -100; i <= 100; i++) {
      const result = wrapToOctaveRange(i);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(11);
    }
  });

  test('올바른 값을 반환해야합니다.', () => {
    expect(wrapToOctaveRange(-13)).toBe(11);
    expect(wrapToOctaveRange(-12)).toBe(0);
    expect(wrapToOctaveRange(-11)).toBe(1);

    expect(wrapToOctaveRange(-2)).toBe(10);
    expect(wrapToOctaveRange(-1)).toBe(11);

    expect(wrapToOctaveRange(0)).toBe(0);
    expect(wrapToOctaveRange(1)).toBe(1);
    expect(wrapToOctaveRange(2)).toBe(2);

    expect(wrapToOctaveRange(10)).toBe(10);
    expect(wrapToOctaveRange(11)).toBe(11);

    expect(wrapToOctaveRange(12)).toBe(0);
    expect(wrapToOctaveRange(12)).toBe(0);
    expect(wrapToOctaveRange(13)).toBe(1);

    expect(wrapToOctaveRange(24)).toBe(0);
    expect(wrapToOctaveRange(25)).toBe(1);
  });
});

///   calcOctave   ///
describe('calcOctave', () => {
  test('올바른 값을 반환해야합니다.', () => {
    expect(calcOctave(60)).toBe(4);
    expect(calcOctave(61)).toBe(4);
    expect(calcOctave(70)).toBe(4);
    expect(calcOctave(71)).toBe(4);

    expect(calcOctave(72)).toBe(5);
    expect(calcOctave(73)).toBe(5);
    expect(calcOctave(82)).toBe(5);
    expect(calcOctave(83)).toBe(5);

    expect(calcOctave(84)).toBe(6);
    expect(calcOctave(95)).toBe(6);

    expect(calcOctave(59)).toBe(3);
    expect(calcOctave(58)).toBe(3);
    expect(calcOctave(49)).toBe(3);
    expect(calcOctave(48)).toBe(3);

    expect(calcOctave(47)).toBe(2);
    expect(calcOctave(36)).toBe(2);

    expect(calcOctave(23)).toBe(0);
    expect(calcOctave(12)).toBe(0);
    expect(calcOctave(11)).toBe(-1);
    expect(calcOctave(0)).toBe(-1);

    expect(calcOctave(-1)).toBe(-2);
    expect(calcOctave(-12)).toBe(-2);

    expect(calcOctave(-13)).toBe(-3);
    expect(calcOctave(-24)).toBe(-3);
  });
});
