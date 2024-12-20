import { ChordQualityInfoTable } from './types';

export const TAG_GROUP = {
  sixth: ['6', 'sixth'],
  seventh: ['7', 'seventh'],
  ninth: ['9', 'nine', 'ninth'],
  eleventh: ['11', 'eleventh'],
  thirteenth: ['13', 'thirteenth'],
  sus: ['suspended'],
  add9: ['add 9', 'add nine', 'add ninth'],
  flat5: ['b5', 'flat 5', 'flat five'],
  sharp9: ['#9', 'sharp 9', 'sharp nine', 'sharp ninth'],
  flat9: ['b9', 'flat 9', 'flat nine', 'flat ninth', 'minor 9', 'minor nine', 'minor ninth'],
  dominant: ['dominant'],
  augmented: ['augmented'],
  diminished: ['diminished'],
};

export const chordQualityInfoTable: ChordQualityInfoTable = {
  1001: {
    id: '1000',
    name: 'major',
    synonyms: [],
    symbols: [''],
    tags: [],
    intervals: ['1', '3', '5'],
  },
  1002: {
    id: '1002',
    name: 'major sixth',
    synonyms: [],
    symbols: ['6'],
    tags: [...TAG_GROUP.sixth],
    intervals: ['1', '3', '5', '6'],
  },

  1003: {
    id: '1003',
    name: 'major sixth ninth',
    synonyms: [],
    symbols: ['6/9', '6add9', '6(add9)'],
    tags: [...TAG_GROUP.sixth, ...TAG_GROUP.ninth, ...TAG_GROUP.add9],
    intervals: ['1', '3', '5', '6', '9'],
  },

  1004: {
    id: '1004',
    name: 'major seventh',
    synonyms: [],
    symbols: ['maj7', 'ma7', 'MA7', 'M7'],
    tags: [...TAG_GROUP.seventh],
    intervals: ['1', '3', '5', '7'],
  },
  1005: {
    id: '1005',
    name: 'major ninth',
    synonyms: [],
    symbols: ['maj9', 'ma9', 'MA9', 'M9'],
    tags: [...TAG_GROUP.ninth],
    intervals: ['1', '3', '5', '7', '9'],
  },

  1006: {
    id: '1006',
    name: 'major eleventh',
    synonyms: [],
    symbols: ['maj11', 'ma11', 'MA11', 'M11'],
    tags: [...TAG_GROUP.eleventh],
    intervals: ['1', '3', '5', '7', '9', '11'],
  },

  1007: {
    id: '1007',
    name: 'major thirteenth',
    synonyms: [],
    symbols: ['maj13', 'ma13', 'MA13', 'M13'],
    tags: [...TAG_GROUP.thirteenth],
    intervals: ['1', '3', '5', '7', '9', '11', '13'],
  },

  1008: {
    id: '1008',
    name: 'major suspended second',
    synonyms: [],
    symbols: ['sus2', '(sus2)'],
    tags: [...TAG_GROUP.sus],
    intervals: ['1', '2', '5'],
  },
  1009: {
    id: '1009',
    name: 'major suspended fourth',
    synonyms: [],
    symbols: ['sus4', '(sus4)', 'sus'],
    tags: [...TAG_GROUP.sus],
    intervals: ['1', '4', '5'],
  },
  1010: {
    id: '1010',
    name: 'minor',
    synonyms: [],
    symbols: ['m', '-', 'mi', 'min'],
    tags: [],
    intervals: ['1', '-3', '5'],
  },
  1011: {
    id: '1011',
    name: 'minor sixth',
    synonyms: ['minor minor seventh'],
    symbols: ['m6', '-6', 'mi6', 'min6'],
    tags: [...TAG_GROUP.sixth],
    intervals: ['1', '-3', '5', '6'],
  },
  1012: {
    id: '1012',
    name: 'minor seventh',
    synonyms: [],
    symbols: ['m7', '-7', 'mi7', 'min7'],
    tags: [...TAG_GROUP.seventh],
    intervals: ['1', '-3', '5', '-7'],
  },

  1013: {
    id: '1013',
    name: 'minor seventh flat five',
    synonyms: ['half diminished'],
    symbols: ['m7(b5)', 'm7b5', '-7(b5)', 'mi7(b5)', 'min7(b5)'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.flat5],
    intervals: ['1', '-3', '-5', '-7'],
  },

  1014: {
    id: '1014',
    name: 'minor ninth',
    synonyms: [],
    symbols: ['m9', '-9', 'mi9', 'min9'],
    tags: [...TAG_GROUP.ninth],
    intervals: ['1', '-3', '5', '-7', '9'],
  },

  1015: {
    id: '1015',
    name: 'minor eleventh',
    synonyms: [],
    symbols: ['m11', '-11', 'mi11', 'min11'],
    tags: [...TAG_GROUP.eleventh],
    intervals: ['1', '-3', '5', '-7', '9', '11'],
  },

  1016: {
    id: '1016',
    name: 'minor thirteenth',
    synonyms: [],
    symbols: ['m13', '-13', 'mi13', 'min13'],
    tags: [...TAG_GROUP.thirteenth],
    intervals: ['1', '-3', '5', '-7', '9', '13'],
  },

  1017: {
    id: '1017',
    name: 'dominant seventh',
    synonyms: ['major minor seventh'],
    symbols: ['7'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.dominant],
    intervals: ['1', '3', '5', '-7'],
  },

  1018: {
    id: '1018',
    name: 'dominant ninth',
    synonyms: [],
    symbols: ['9'],
    tags: [...TAG_GROUP.ninth, ...TAG_GROUP.dominant],
    intervals: ['1', '3', '5', '-7', '9'],
  },

  1019: {
    id: '1019',
    name: 'dominant eleventh',
    synonyms: [],
    symbols: ['11'],
    tags: [...TAG_GROUP.eleventh, ...TAG_GROUP.dominant],
    intervals: ['1', '3', '5', '-7', '9', '11'],
  },

  1020: {
    id: '1020',
    name: 'dominant thirteenth',
    synonyms: [],
    symbols: ['13'],
    tags: [...TAG_GROUP.thirteenth, ...TAG_GROUP.dominant],
    intervals: ['1', '3', '5', '-7', '9', '11', '13'],
  },

  1021: {
    id: '1021',
    name: 'dominant seventh suspended fourth',
    synonyms: [],
    symbols: ['7sus4', '7(sus4)', '7sus'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.dominant, ...TAG_GROUP.sus],
    intervals: ['1', '4', '5', '-7'],
  },

  1022: {
    id: '1022',
    name: 'dominant seventh flat five',
    synonyms: [],
    symbols: ['7(b5)', '7b5'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.dominant, ...TAG_GROUP.flat5],
    intervals: ['1', '3', '-5', '-7'],
  },

  1023: {
    id: '1023',
    name: 'dominant seventh sharp ninth',
    synonyms: ['dominant sharp ninth'],
    symbols: ['7(#9)', '7#9'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.dominant, ...TAG_GROUP.sharp9],
    intervals: ['1', '3', '5', '-7', '+9'],
  },

  1024: {
    id: '1024',
    name: 'dominant minor ninth',
    synonyms: [],
    symbols: ['7(b9)', '7b9'],
    tags: [...TAG_GROUP.seventh, ...TAG_GROUP.dominant, ...TAG_GROUP.flat9],
    intervals: ['1', '3', '5', '-7', '-9'],
  },

  1025: {
    id: '1025',
    name: 'added ninth',
    synonyms: ['added second'],
    symbols: ['add9', '(add9)', 'add2', '(add2)'],
    tags: [...TAG_GROUP.ninth, ...TAG_GROUP.add9],
    intervals: ['1', '3', '5', '9'],
  },

  1026: {
    id: '1026',
    name: 'augmented',
    synonyms: [],
    symbols: ['+', 'aug', '(#5)'],
    tags: [...TAG_GROUP.augmented],
    intervals: ['1', '3', '+5'],
  },

  1027: {
    id: '1027',
    name: 'diminished',
    synonyms: [],
    symbols: ['o', 'dim', 'm(b5)', 'mb5'],
    tags: [...TAG_GROUP.diminished],
    intervals: ['1', '-3', '-5'],
  },

  1028: {
    id: '1028',
    name: 'diminished seventh',
    synonyms: ['fully diminished'],
    symbols: ['o7', 'dim7', 'dim', 'o'],
    tags: [...TAG_GROUP.diminished, ...TAG_GROUP.seventh],
    intervals: ['1', '-3', '-5', '--7'],
  },

  1029: {
    id: '1029',
    name: 'power',
    synonyms: ['fifth'],
    symbols: ['5', 'omit3', '(omit3)', 'no3', '(no3)'],
    tags: [],
    intervals: ['1', '5'],
  },
};
