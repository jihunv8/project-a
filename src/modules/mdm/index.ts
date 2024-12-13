import { Accidental, BaseNoteName, RootNote, castAccidental, castBaseNoteName } from '@/modules/mdm/types';

// Music Data Module
export * from './types';

export function decomposeRootNote(rootNote: RootNote): [BaseNoteName, Accidental] {
  const baseNoteName = castBaseNoteName(rootNote.split('')[0] ?? 'C');
  const accidental = castAccidental(rootNote.split('')[1] ?? '');
  return [baseNoteName, accidental];
}

export const composeRootNote = (baseNoteName: BaseNoteName, accidental: Accidental): RootNote => {
  return `${baseNoteName}${accidental}`;
};
