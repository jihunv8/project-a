import { chordQualityInfoTable } from './chordQualityInfoTable';
import { ChordQualityInfo, ChordQualityInfoTable } from './types';
import SearchEngine, { KeywordSearchEngine } from '@/modules/search-engine';

export type ChordQualityDictionary = KeywordSearchEngine<ChordQualityInfo>;

export const chordQualityDictionary: ChordQualityDictionary = createChordQualityDictionary(chordQualityInfoTable);

function createChordQualityDictionary(chordQualityInfoTable: ChordQualityInfoTable): ChordQualityDictionary {
  const searchEngine = SearchEngine.keyword.createKeywordSearchEngine(chordQualityInfoTable, (chordInfo) => {
    const { name, synonyms, symbols, tags } = chordInfo;
    return [name, ...synonyms, ...symbols, ...tags];
  });

  return searchEngine;
}
