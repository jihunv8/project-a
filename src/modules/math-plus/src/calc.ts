/** 나누어 몫을 구합니다. */
export function calcQuotient(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error('0으로 나눌 수 없습니다.');
  }

  const quotient = Math.trunc(dividend / divisor);

  return quotient;
}

/** 나누어 나머지를 구합니다. */
export function calcRmainder(dividend: number, divisor: number): number {
  if (divisor === 0) {
    throw new Error('0으로 나눌 수 없습니다.');
  }

  const quotient = dividend % divisor;

  return quotient;
}

export function calcDifference(num1: number, num2: number) {
  return Math.abs(num1 - num2);
}
