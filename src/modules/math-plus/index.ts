import * as MathPlus from './calc';
export * from './calc';
export { MathPlus };
export default MathPlus;

/** 나누어 몫과 나머지를 구합니다. 반환값: [ 몫, 나머지 ]*/
export function divide(dividend: number, divisor: number): [number, number] {
  if (divisor === 0) {
    throw new Error('0으로 나눌 수 없습니다.');
  }

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  return [quotient, remainder];
}
