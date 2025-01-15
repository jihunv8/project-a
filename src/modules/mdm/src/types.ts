export type BaseNoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

export function checkBaseNoteName(str: string): str is BaseNoteName {
  return ['C', 'D', 'E', 'F', 'G', 'A', 'B'].includes(str);
}

export function castBaseNoteName(str: string): BaseNoteName {
  if (checkBaseNoteName(str)) {
    return str;
  }

  throw new Error(`${str}은 BaseNoteName이 아닙니다.`);
}

export type Accidental = 'b' | '#' | '';

export function checkAccidental(str: string): str is Accidental {
  return ['b', '#', ''].includes(str);
}

export function castAccidental(str: string): Accidental {
  if (checkAccidental(str)) {
    return str;
  }

  throw new Error(`${str}은 Accidental이 아닙니다.`);
}
export type RootNote = `${BaseNoteName}${Accidental}`;
