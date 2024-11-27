/** SCSS 모듈 타입 */
type Style = { readonly [key: string]: string };

export function createSimpleClassNamer(style: Style) {
  return (...classNames: (string | [boolean, ...string[]])[]) => new ClassNamer(style).n(...classNames);
}

export function createClassNamer(style: Style) {
  return () => new ClassNamer(style);
}

class ClassNamer {
  private className: string = '';
  private style: Style;

  constructor(style: Style) {
    this.style = style;
  }

  /** 이름을 추가하고 반환합니다. ClassNamer을 간편하게 사용하기 위한 메소드입니다. */
  n(...classNames: (string | [boolean, ...string[]])[]) {
    classNames.forEach((className) => {
      if (Array.isArray(className)) {
        this.nameIf(className[0], ...(className.slice(1, className.length) as string[]));
        return;
      }

      this.name(className);
    });

    return convertToStyleName(this.style, this.className);
  }

  /** 이름을 추가합니다. */
  name(...classNames: string[]): typeof this {
    if (classNames.length === 0) return this;

    classNames.forEach((className) => {
      if (className.length === 0) return;
      this.className += ' ' + className;
    });

    return this;
  }

  /** 조건에 따라 이름을 추가합니다. */
  nameIf(condition: boolean, ...className: string[]): typeof this {
    if (condition) this.name(...className);
    return this;
  }

  /** 이름을 style에 맞게 변환하여 반환합니다. */
  read() {
    return convertToStyleName(this.style, this.className);
  }
}

function convertToStyleName(style: Style, name: string) {
  const names = splitBySpace(name);
  const styleNames = getStyleNames(style, names);
  const convertedName = styleNames.join(' ');
  return convertedName;
}

function getStyleNames(style: Style, keys: string[]): string[] {
  const filtered = keys.filter((key) => getStyleName(style, key).length > 0);
  const mapped = filtered.map((key) => getStyleName(style, key));

  return mapped;
}

function getStyleName(style: Style, key: string): string {
  return style[key] ?? '';
}

function splitBySpace(str: string) {
  const splitted = str.trim().split(' ');
  return splitted;
}
