import { InvertedIndex, KeywordsMap } from './types';

/** 역색인에서 입력받은 모든 키워드에 해당하는 모든 id을 반환합니다. */
export function getIdsByKeywords(invertedIndex: InvertedIndex, keywords: string[]): string[] {
  const ids = keywords.reduce<string[]>((result, keyword) => {
    const newResult = [...result, ...getIds(invertedIndex, keyword)];
    const deduplicatedResult = Array.from(new Set(newResult));
    return deduplicatedResult;
  }, []);

  return ids;
}

/** 역색인에서 입력받은 키워드에 해당하는 모든 id를 반환합니다. */
export function getIds(invertedIndex: InvertedIndex, keyword: string): string[] {
  if (keyword.length === 0) return [];

  const tokens = tokenize(keyword);
  const idSets = tokens.map((token) => {
    const idSet = invertedIndex[token] ?? [];
    return Array.from(idSet);
  });

  return intersection(idSets);
}

/** 교집합을 구합니다. */
function intersection<T>(sets: T[][]): T[] {
  if (sets.length === 0) return [];

  return sets.reduce<T[]>((result, set) => {
    return result.filter((el) => set.includes(el));
  }, sets[0]);
}

/** 역색인 */
export function createInvertedIndex(keywordsMap: KeywordsMap): InvertedIndex {
  const invertedIndex: InvertedIndex = {};

  // 역색인에 targetId 추가
  const addTargetId = (token: string, targetId: string) => {
    if (invertedIndex[token] === undefined) invertedIndex[token] = new Set<string>();
    invertedIndex[token].add(targetId);
  };

  // 역색인에 targetId를 keyword에 맞게 추가
  const addTargetIdToKeyword = (keyword: string, targetId: string) => {
    const tokens = tokenize(keyword);

    tokens.forEach((token) => {
      addTargetId(token, targetId);
    });
  };

  Object.entries(keywordsMap).forEach(([targetId, keywords]) => {
    keywords.forEach((keyword) => {
      addTargetIdToKeyword(keyword, targetId);
    });
  });

  return invertedIndex;
}

/** 키워드를 의미가있는 최소 단위로 분해합니다. */
function tokenize(keyword: string): string[] {
  return keyword.trim().split(' ');
}
