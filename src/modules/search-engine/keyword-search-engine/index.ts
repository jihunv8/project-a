import { KeywordIndex, KeywordTable } from './types';

export class KeywordSearchEngine {
  private index: KeywordIndex = {};

  constructor(keywordTable: KeywordTable) {
    this.indexing(keywordTable);
  }

  search(keyword: string): string[] {
    const keys = this.index[keyword];

    return keys !== undefined ? Array.from(keys) : [];
  }

  private indexing(keywordTable: KeywordTable): void {
    Object.entries(keywordTable).forEach(([target, keywords]) => {
      keywords.forEach((keyword) => {
        this.addKeyword(keyword, target);
      });
    });
  }

  private addKeyword(keyword: string, target: string) {
    for (let i = 0; i <= keyword.length; i++) {
      const subKeyword = keyword.slice(0, i);
      if (this.index[subKeyword] === undefined) this.index[subKeyword] = new Set<string>();
      this.index[subKeyword].add(target);
    }
  }
}
