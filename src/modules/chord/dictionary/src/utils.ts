import { ChordQualityInfo } from '../quality-dictionary/src/types';
import { chordQualityDictionary } from '../quality-dictionary';
import { ChordInfo } from './types';

type Root = `${'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'}${'#' | 'b' | ''}`;

class ChordDictionary {
  private qualityDictionary = chordQualityDictionary;

  search(root: Root, keyword: string): ChordInfo[] {
    const qualities = this.qualityDictionary.search(keyword);

    const chords = qualities.map((quality) => {
      return createChord(root, quality);
    });

    return chords;
  }
}

function createDictionary() {
  return new ChordDictionary();
}

export const dictionary = createDictionary();

function createChord(root: Root, quality: ChordQualityInfo): ChordInfo {
  const { name, synonyms, symbols, intervals } = quality;
  const chordName = `${root} ${name}`;
  const chordSynonym = synonyms.map((synonym) => `${root} ${synonym}`);
  const chordSymbols = symbols.map((symbol) => `${root}${symbol}`);
  const chordNumbers = getNoteNumbers(root, intervals);

  return {
    name: chordName,
    synonym: chordSynonym,
    symbols: chordSymbols,
    intervals,
    noteNumbers: chordNumbers,
  };
}

function getNoteNumbers(root: Root, intervals: string[]) {
  const cMajorScale = [0, 2, 4, 5, 7, 9, 11];

  const numbers = intervals.map((interval) => {
    const [base, accitantal] = parseInterval(interval);
    const noteNumber = cMajorScale[base - 1] + accitantal;
    const rootValue = getRootValue(root);

    return noteNumber + rootValue;
  });

  return numbers;
}

function getRootValue(root: Root) {
  switch (root) {
    case 'B#':
    case 'C':
      return 0;
    case 'C#':
    case 'Db':
      return 1;
    case 'D':
      return 2;
    case 'D#':
    case 'Eb':
      return 3;
    case 'E':
    case 'Fb':
      return 4;
    case 'E#':
    case 'F':
      return 5;
    case 'F#':
    case 'Gb':
      return 6;
    case 'G':
      return 7;
    case 'G#':
    case 'Ab':
      return 8;
    case 'A':
      return 9;
    case 'A#':
    case 'Bb':
      return 10;
    case 'B':
    case 'Cb':
      return 11;
  }
}

function parseInterval(interval: string): [number, number] {
  const splited = interval.split('');
  const base = Number(splited[splited.length - 1]);

  if (splited.length === 1) {
    return [base, 0];
  }

  if (splited[0] === '+') return [base, splited.length - 1];
  if (splited[0] === '-') return [base, (splited.length - 1) * -1];

  throw new Error(`${interval}은 올바른 형식이 아님`);
}
