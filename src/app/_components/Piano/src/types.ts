import { NoteNumber } from '@/modules/nnm';

export type KeyState = 'default' | 'pressed' | 'highlight';

export type KeyInfo = {
  number: NoteNumber;
  state: KeyState;
};
