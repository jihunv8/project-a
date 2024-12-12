import { ChordQualityInfoTable } from './types';

export const chordQualityInfoTable: ChordQualityInfoTable = {
  1000: {
    id: '1000',
    name: 'major',
    synonyms: [],
    symbols: [''],
    tags: [],
    intervals: ['1', '3', '5'],
  },

  1001: {
    id: '1001',
    name: 'major seventh',
    synonyms: [],
    symbols: ['maj7', 'ma7', 'MA7', 'M7'],
    tags: ['7', 'seven', 'seventh'],
    intervals: ['1', '3', '5', '7'],
  },
  1002: {
    id: '1002',
    name: 'minor',
    synonyms: [],
    symbols: ['m', '-', 'mi', 'min'],
    tags: [],
    intervals: ['1', '-3', '5'],
  },
  1003: {
    id: '1003',
    name: 'minor seventh',
    synonyms: [],
    symbols: ['m7', '-7', 'mi6', 'min6'],
    tags: ['7', 'seven', 'seventh'],
    intervals: ['1', '-3', '5', '-7'],
  },
  1004: {
    id: '1004',
    name: 'minor seventh flat five',
    synonyms: ['half diminished'],
    symbols: ['m7(b5)', 'm7b5', '-7(b5)', 'mi7(b5', 'min7(b5)'],
    tags: [],
    intervals: ['1', '-3', '-5', '-7'],
  },
};
