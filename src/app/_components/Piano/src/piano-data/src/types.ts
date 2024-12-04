import { Immutable } from 'immer';
import { PianoUnitData } from './piano-unit';

export type PianoData = Immutable<{
  startOctave: number;
  units: PianoUnitData[];
}>;
