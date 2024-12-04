import { Immutable, castDraft, produce } from 'immer';
import PianoUnitDataModule, { PianoUnitData } from './piano-unit';
import PianoKeyDataModule, { PianoKeyData } from './key';
import { PianoData } from './types';

type Options = Immutable<{
  startOctave?: number;
  totalOctave?: number;
  minTotalOctave?: number;
}>;

export function create(keys: PianoKeyData[], { startOctave, totalOctave, minTotalOctave }: Options = {}): PianoData {
  const DEFAULT_OCTAVE = 4;
  const minOctave = keys.length > 0 ? PianoKeyDataModule.getMinOctave(keys) : DEFAULT_OCTAVE;
  if (startOctave === undefined) startOctave = minOctave;

  if (totalOctave === undefined) {
    totalOctave = calcTotalOctave(minOctave, startOctave, PianoKeyDataModule.getTotalOctave(keys));
  }

  if (minTotalOctave !== undefined && totalOctave < minTotalOctave) {
    totalOctave = minTotalOctave;
  }

  const defaultUnits = createDefaultUnits(startOctave, totalOctave);
  const units = setKeysToUnits(keys, defaultUnits);

  return {
    startOctave,
    units,
  };
}

function calcTotalOctave(minOctave: number, startOctave: number, orginTotalOctave: number): number {
  return minOctave - startOctave + orginTotalOctave;
}

function createDefaultUnits(startOctave: number, totalOctave: number): PianoUnitData[] {
  const units: PianoUnitData[] = [];

  for (let i = 0; i < totalOctave; i++) {
    units[i] = PianoUnitDataModule.createDefault(startOctave + i);
  }

  return units;
}

function setKeysToUnits(keys: PianoKeyData[], units: PianoUnitData[]): PianoUnitData[] {
  if (keys.length === 0) return [];

  const startOctave = units[0].octave;

  return keys.reduce((units, key) => {
    const octave = PianoKeyDataModule.getOctave(key);
    const index = octave - startOctave;
    const unit: PianoUnitData | undefined = units[index];
    if (unit === undefined) return units;

    return produce(units, (draft) => {
      draft[index] = castDraft(PianoUnitDataModule.setKey(unit, key));
    });
  }, units);
}
