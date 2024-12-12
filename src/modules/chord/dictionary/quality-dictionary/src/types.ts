export type ChordQualityInfo = {
  id: string;
  name: string;
  synonyms: string[];
  symbols: string[];
  tags: string[];

  /** 코드특성의 음정. flat과 sharp은 -와 +로 나타냅니다.
   *
   * diminished seventh의 음정 => 1, b3, b5, bb7 => ['1', '-3', '-5', '--7']
   *
   * aumented의 음정 => 1, 3, #5 => ['1', '3', '+5']
   */
  intervals: string[];
};

export type ChordQualityInfoTable = { [id: ChordQualityInfo['id']]: ChordQualityInfo };
