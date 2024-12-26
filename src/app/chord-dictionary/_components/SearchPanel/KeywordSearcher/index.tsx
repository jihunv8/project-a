import style from './index.module.scss';
import { createSimpleClassNamer } from '@/modules/class-namer';

import SearchBar from './SearchBar';
import RootSelector from './RootSelector';
import { RootNote } from '@/modules/mdm';

const namer = createSimpleClassNamer(style);

type KeywordSearcherProps = {
  rootNote?: RootNote;
  onSelectRootNote?: (rootNote: RootNote) => void;
  keyword?: string;
  onTypeKeyword?: (keyword: string) => void;
  suggestedKeywords?: string[];
  onSelectSuggestedKeyword?: (suggestedKeyword: string) => void;
};

export default function KeywordSearcher({
  rootNote = 'C',
  onSelectRootNote = () => {},
  keyword = '',
  onTypeKeyword = () => {},
  suggestedKeywords = [],
  onSelectSuggestedKeyword = () => {},
}: KeywordSearcherProps) {
  return (
    <section className={namer('wrapper')}>
      <RootSelector rootNote={rootNote} onSelect={onSelectRootNote} />
      <SearchBar
        keyword={keyword}
        onTypeKeyword={onTypeKeyword}
        suggestedKeywords={suggestedKeywords}
        onSelectSuggestedKeyword={onSelectSuggestedKeyword}
      />
    </section>
  );
}
