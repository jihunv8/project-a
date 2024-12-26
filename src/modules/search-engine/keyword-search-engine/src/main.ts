import { KeywordsMap } from './types';
import { createInvertedIndex, getIdsByKeywords } from './invertedIndex';
import { createTrie } from './trie';

export type KeywordsExtractor<T> = (element: T) => string[];
export type SearchEngineData<T> = { [id: string]: T };
export type SearchResult<T> = {
  items: T[];
};

export type KeywordSearchEngine<T> = {
  search(keyword: string): SearchResult<T>;

  /** 입력된 키워드를 기반으로 자동 완성된 키워드를 추천합니다. */
  suggestKeywords(keyword: string): string[];
};

/** 키워드로 검색하는 엔진을 생성합니다. */
export function createKeywordSearchEngine<T>(
  data: SearchEngineData<T>,
  extractKeywords: KeywordsExtractor<T>
): KeywordSearchEngine<T> {
  const keywordsMap = createKeywordsMap(data, extractKeywords);
  const invertedIndex = createInvertedIndex(keywordsMap);
  const autoCompleter = createAutoCompleter(keywordsMap);

  const search: KeywordSearchEngine<T>['search'] = (keyword) => {
    const autoCompletedWords = autoCompleter.search(keyword);

    const ids = getIdsByKeywords(invertedIndex, autoCompletedWords);
    const items = ids.map((id) => {
      return data[id];
    });

    return {
      items,
    };
  };

  const suggestKeywords: KeywordSearchEngine<T>['suggestKeywords'] = (keyword) => {
    return autoCompleter.search(keyword);
  };

  return {
    search,
    suggestKeywords,
  };
}

/** 데이터의 각 요소의 검색키워드를 맵핑합니다. */
function createKeywordsMap<T>(data: { [id: string]: T }, getKeywords: (element: T) => string[]): KeywordsMap {
  const keywordsMap: KeywordsMap = {};

  Object.entries(data).forEach(([targetId, element]) => {
    const keywords = getKeywords(element);

    keywordsMap[targetId] = keywords;
  });

  return keywordsMap;
}

/** 키워드 자동 완성기를 생성합니다. */
function createAutoCompleter(keywordsMap: KeywordsMap) {
  const words = new Set<string>();
  Object.entries(keywordsMap).forEach(([, keywords]) => {
    keywords.forEach((keyword) => {
      words.add(keyword);
      const subKeywords = keyword.trim().split(' ');
      subKeywords.forEach((subKeyword) => {
        words.add(subKeyword);
      });
    });
  });

  const trie = createTrie(Array.from(words));

  return trie;
}
