import { chordQualityInfoTable } from './chordQualityInfoTable';
import { ChordQualityInfo, ChordQualityInfoTable } from './types';
import { createKeywordSearchEngine, KeywordSearchEngine } from '@/modules/search-engine/keyword-search-engine/src/main';

export type ChordQualityDictionary = KeywordSearchEngine<ChordQualityInfo>;

export const dictionary: ChordQualityDictionary = createChordQualityDictionary(chordQualityInfoTable);

function createChordQualityDictionary(chordQualityInfoTable: ChordQualityInfoTable): ChordQualityDictionary {
  const searchEngine = createKeywordSearchEngine(chordQualityInfoTable, (chordInfo) => {
    const { name, synonyms, symbols, tags } = chordInfo;
    return [name, ...synonyms, ...symbols, ...tags];
  });

  return searchEngine;
}
