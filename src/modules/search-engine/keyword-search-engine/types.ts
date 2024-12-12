type Target = string;
type Keyword = string;

export type KeywordTable = {
  [target: Target]: Keyword[];
};

export type KeywordIndex = {
  [keyword: Keyword]: Set<Target>;
};
