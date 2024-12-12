import { KeywordSearchEngine } from '@/modules/search-engine/keyword-search-engine';
import { KeywordTable } from '@/modules/search-engine/keyword-search-engine/types';

import { chordQualityInfoTable } from './chordQualityInfoTable';
import { ChordQualityInfo, ChordQualityInfoTable } from './types';

class ChordQualityDictionary {
  private searchEngine: KeywordSearchEngine;
  private infoTable: ChordQualityInfoTable;

  constructor(chordQualityInfoTable: ChordQualityInfoTable) {
    this.infoTable = chordQualityInfoTable;
    const keywordsTable = createKeywordsTable(chordQualityInfoTable);
    this.searchEngine = new KeywordSearchEngine(keywordsTable);
  }

  search(keyword: string): ChordQualityInfo[] {
    const ids = this.searchEngine.search(keyword);

    const chordInfos = ids
      .map((id) => this.get(id))
      .filter((chordInfo): chordInfo is ChordQualityInfo => chordInfo !== undefined);

    return chordInfos;
  }

  get(id: string): ChordQualityInfo | undefined {
    return this.infoTable[id];
  }
}

export const dictionary = createChordQualityDictionary(chordQualityInfoTable);

function createChordQualityDictionary(chordQualityInfoTable: ChordQualityInfoTable) {
  return new ChordQualityDictionary(chordQualityInfoTable);
}

function createKeywordsTable(chordQualityInfoTable: ChordQualityInfoTable): KeywordTable {
  return Object.entries(chordQualityInfoTable).reduce<{ [key: string]: string[] }>((table, [id, chordInfo]) => {
    const keywords = getKeywords(chordInfo);

    return { ...table, [id]: keywords };
  }, {});
}

function getKeywords(chordInfo: ChordQualityInfo): string[] {
  const { name, synonyms, symbols, tags } = chordInfo;

  return [name, ...synonyms, ...symbols, ...tags];
}
