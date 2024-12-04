import { Immutable } from 'immer';
import { PianoKeyData } from '../../key';

export type PianoUnitData = Immutable<{
  octave: number;
  keys: {
    0: PianoKeyData;
    1: PianoKeyData;
    2: PianoKeyData;
    3: PianoKeyData;
    4: PianoKeyData;
    5: PianoKeyData;
    6: PianoKeyData;
    7: PianoKeyData;
    8: PianoKeyData;
    9: PianoKeyData;
    10: PianoKeyData;
    11: PianoKeyData;
  };
}>;
