import { Immutable, produce } from 'immer';
import nnm from '@/modules/nnm';
import { PianoUnitData } from './types';
import PianoKeyDataModule, { PianoKeyData } from '../../key';

/** 인수로 받은 키들로 설정된 피아노유닛을 생성합니다. */
export function createByKeys(octave: number, keys: Immutable<PianoKeyData[]> = []): PianoUnitData {
  const newUnit: PianoUnitData = createDefault(octave);

  return keys.reduce((unit, key) => {
    return setKey(unit, key);
  }, newUnit);
}

export function createDefault(octave: number): PianoUnitData {
  return {
    octave,
    keys: createDefaultKeys(octave),
  };
}

export function createDefaultKeys(octave: number): PianoUnitData['keys'] {
  const minNumber = nnm.getMinInOctave(octave);
  return {
    0: PianoKeyDataModule.createDefault(minNumber + 0),
    1: PianoKeyDataModule.createDefault(minNumber + 1),
    2: PianoKeyDataModule.createDefault(minNumber + 2),
    3: PianoKeyDataModule.createDefault(minNumber + 3),
    4: PianoKeyDataModule.createDefault(minNumber + 4),
    5: PianoKeyDataModule.createDefault(minNumber + 5),
    6: PianoKeyDataModule.createDefault(minNumber + 6),
    7: PianoKeyDataModule.createDefault(minNumber + 7),
    8: PianoKeyDataModule.createDefault(minNumber + 8),
    9: PianoKeyDataModule.createDefault(minNumber + 9),
    10: PianoKeyDataModule.createDefault(minNumber + 10),
    11: PianoKeyDataModule.createDefault(minNumber + 11),
  };
}

export function setKey(unit: PianoUnitData, key: PianoKeyData) {
  nnm.validateNoteNumberForOctave(key.number, unit.octave);

  const index = nnm.wrapToOctaveRange(key.number);
  return produce(unit, (draft) => {
    draft.keys[index] = key;
  });
}

/** PianoUnitData의 octave를 설정합니다. */
export function setOctave(unit: PianoUnitData, octave: number): PianoUnitData {
  const keysInArray = Object.entries(unit.keys).map((entry) => entry[1]);

  const adjustedKeys = keysInArray.reduce((keys, key, i) => {
    const index = nnm.castOctaveRange(i);
    const adjustedNumber = nnm.getInOctave(octave, index);
    const adjustedKey = PianoKeyDataModule.setNumber(key, adjustedNumber);

    return produce(keys, (draft) => {
      draft[index] = adjustedKey;
    });
  }, unit.keys);

  return produce(unit, (draft) => {
    draft.octave = octave;
    draft.keys = adjustedKeys;
  });
}
