import { KeywordsMap } from './types';
import { createInvertedIndex } from './invertedIndex';

const keywordMap: KeywordsMap = {
  0: ['foo', 'bar', 'unique'],
  1: ['bar'],
  2: ['foo'],
  3: ['apple'],
  4: ['banana'],
  5: ['buzz'],
  6: ['bizz'],
  7: ['foo'],
  8: ['apple'],
  9: ['banana'],
  10: ['foo'],
};
const invertedIndex = createInvertedIndex(keywordMap);

describe('getIdsByKeywords', () => {
  test('tt', () => {});
});
describe('getIds', () => {
  test('tt', () => {});
});
describe('createInvertedIndex', () => {
  test('tt', () => {});
});
