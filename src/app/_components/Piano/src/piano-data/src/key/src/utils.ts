import Nnm, { NoteNumber } from '@/modules/nnm';
import { PianoKeyData, PianoKeyState } from './types';
import { Immutable, produce } from 'immer';

// keys
export function getTotalOctave(keys: Immutable<PianoKeyData[]>): number {
  if (keys.length === 0) return 0;

  const max = getMaxOctave(keys);
  const min = getMinOctave(keys);
  return max - min + 1;
}

export function getMaxOctave(keys: Immutable<PianoKeyData[]>): number {
  if (keys.length === 0) throw new Error('빈 배열에선 최대값을 구할 수 없습니다.');
  return Nnm.getOctave(getMaxNoteNumber(keys));
}

export function getMinOctave(keys: Immutable<PianoKeyData[]>): number {
  if (keys.length === 0) throw new Error('빈 배열에선 최대값을 구할 수 없습니다.');
  return Nnm.getOctave(getMinNoteNumber(keys));
}

export function getMaxNoteNumber(keys: Immutable<PianoKeyData[]>): NoteNumber {
  if (keys.length === 0) throw new Error('빈 배열에선 최대값을 구할 수 없습니다.');
  return keys.reduce((max, keyInfo) => (keyInfo.number > max ? keyInfo.number : max), -Infinity);
}

export function getMinNoteNumber(keys: Immutable<PianoKeyData[]>): NoteNumber {
  if (keys.length === 0) throw new Error('빈 배열에선 최소값을 구할 수 없습니다.');
  return keys.reduce((min, keyInfo) => (keyInfo.number < min ? keyInfo.number : min), Infinity);
}

export function sort(keys: Immutable<PianoKeyData[]>): Immutable<PianoKeyData[]> {
  return keys.toSorted(compare);
}

// key
export function setNumber(key: PianoKeyData, number: NoteNumber): PianoKeyData {
  return produce(key, (draft) => {
    draft.number = number;
  });
}

export function createDefault(number: number): PianoKeyData {
  return create(number);
}

export function create(number: number, { state = 'default' }: { state?: PianoKeyState } = {}): PianoKeyData {
  return {
    number,
    state,
  };
}

export function getOctave(key: PianoKeyData): number {
  return Nnm.getOctave(key.number);
}

export function compare(a: PianoKeyData, b: PianoKeyData): number {
  return a.number - b.number;
}
