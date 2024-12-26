import { ChordQualityInfo } from '../quality-dictionary/src/types';
import { chordQualityDictionary } from '../quality-dictionary';
import { ChordInfo } from './types';
import { RootNote } from '@/modules/mdm';
import MathPlus from '@/modules/math-plus';

class ChordDictionary {
  private qualityDictionary = chordQualityDictionary;

  search(root: RootNote, keyword: string): ChordInfo[] {
    const qualities = this.qualityDictionary.search(keyword).items;

    const chords = qualities.map((quality) => {
      return createChord(root, quality);
    });

    return chords;
  }

  suggestKeywords(keyword: string) {
    return this.qualityDictionary.suggestKeywords(keyword);
  }
}

function createDictionary() {
  return new ChordDictionary();
}

export const dictionary = createDictionary();

function createChord(root: RootNote, quality: ChordQualityInfo): ChordInfo {
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

function getNoteNumbers(root: RootNote, intervals: string[]) {
  const NUM_OF_NOTE_IN_SCALE = 7;
  const cMajorScale = [0, 2, 4, 5, 7, 9, 11];

  const numbers = intervals.map((interval) => {
    const [base, accitantal] = parseInterval(interval);
    const index = (base - 1) % NUM_OF_NOTE_IN_SCALE;
    const octave = MathPlus.calcQuotient(base - 1, NUM_OF_NOTE_IN_SCALE);
    const noteNumber = cMajorScale[index] + accitantal;
    const rootValue = getRootValue(root);
    const incresement = octave * 12;

    return noteNumber + rootValue + incresement;
  });

  return numbers;
}

function getRootValue(root: RootNote) {
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
  const match = interval.match(/^(([-]+)|([+]+))?([1-9]\d*)$/);

  if (match === null) {
    throw new Error(`interval${interval}은 올바른 형식이 아닙니다.`);
  }

  const signs = match[1] || ''; // 기호 부분, 없으면 빈 문자열
  const number = Number(match[4]); // 숫자 부분

  if (signs.length === 0 || signs[0] === '+') {
    return [number, signs.length];
  }

  return [number, signs.length * -1];
}
