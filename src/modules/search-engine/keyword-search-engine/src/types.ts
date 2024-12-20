type TargetId = string;
type Keyword = string;

export type KeywordsMap = {
  [targetId: TargetId]: Keyword[];
};

export type InvertedIndex = {
  [token: string]: Set<TargetId>;
};
