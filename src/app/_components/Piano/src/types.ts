import { NoteNumber } from '@/modules/nnm';

export type KeyState = 'default' | 'pressed' | 'highlight';

export type KeyInfo = {
  value: NoteNumber;
  state: KeyState;
};
