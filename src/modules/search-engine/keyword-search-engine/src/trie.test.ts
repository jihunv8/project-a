import { createTrie } from './trie';

describe('trie test', () => {
  test('빈 문자열은 검색하지 않습니다.', () => {
    const trie = createTrie(['a', 'b', 'c']);
    expect(trie.search('')).not.toContain('');
    expect(trie.search('')).toEqual(['a', 'b', 'c']);
  });

  test('반환된 문자들은 사전순으로 정렬되어야 합니다.', () => {
    const trie1 = createTrie(['a', 'D', 'c', 'd', 'A', 'C', 'e', 'b', 'B', 'g', 'f']);
    expect(trie1.search('')).toEqual(['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd', 'e', 'f', 'g']);

    const trie2 = createTrie(['min', 'm', 'major', 'minor', 'mi', 'ma', 'maj']);

    expect(trie2.search('m')).toEqual(['m', 'ma', 'maj', 'major', 'mi', 'min', 'minor']);
  });

  test('완성된 단어들을 모두 반환해야합니다.', () => {
    const trie = createTrie(['m', 'mi', 'min', 'minor', 'ma', 'maj', 'major']);
    expect(trie.search('m')).toEqual(['m', 'ma', 'maj', 'major', 'mi', 'min', 'minor']);
    expect(trie.search('mi')).toEqual(['mi', 'min', 'minor']);
    expect(trie.search('ma')).toEqual(['ma', 'maj', 'major']);

    expect(trie.search('mi')).not.toEqual(['mi', 'min', 'mino', 'minor']);
  });
});
