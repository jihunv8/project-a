import { Immutable } from 'immer';
import { NoteNumber } from '@/modules/nnm';

export type PianoKeyData = Immutable<{
  number: NoteNumber;
  state: PianoKeyState;
}>;

export type PianoKeyState = 'default' | 'pressed' | 'highlight';
