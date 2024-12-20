export type TrieNode = {
  str: string;
  isComplete: boolean;
  children: Map<string, TrieNode>;
};

export function createTrie(words: string[]) {
  const root = createTrieNode();
  const trieTree = insertMany(root, words);

  return {
    search(prefix: string) {
      return search(trieTree, prefix);
    },
  };
}

/** Trie 트리에서 완성된 키워드를 모두 찾습니다. */
function search(root: TrieNode, prefix: string): string[] {
  const startNode = moveToPrefix(root, prefix);

  if (startNode === undefined) return [];

  return searchCompletedWords(startNode);
}

/** 인수로 받은 노드에서 완성된 단어를 모두 찾습니다. */
const searchCompletedWords = (node: TrieNode) => {
  const completedWords: string[] = [];

  traverseTrie(node, (traversedNode) => {
    if (traversedNode.isComplete) completedWords.push(traversedNode.str);
  });

  return completedWords;
};

/** Trie 트리를 순회하며 인수로 받은 콜백을 실행합니다. */
function traverseTrie(node: TrieNode, excute: (node: TrieNode) => void) {
  excute(node);
  node.children.forEach((node) => {
    traverseTrie(node, excute);
  });
}

/** 인수로 받은 노드에서 prefix에 해당하는 노드까지 이동합니다. */
const moveToPrefix = (node: TrieNode, prefix: string): TrieNode | undefined => {
  // 목표 노드에 도달함
  if (prefix.length === 0) return node;

  // 목표 노드에 도달하지 못함
  const char = prefix[0];
  const nextNode = node.children.get(char);

  if (nextNode === undefined) return undefined;

  const nextPrefix = prefix.slice(1);
  return moveToPrefix(nextNode, nextPrefix);
};

/** Trie 노드를 생성합니다. */
function createTrieNode(options?: Partial<TrieNode>): TrieNode {
  const { str, isComplete, children } = options ?? {};
  return {
    str: str ?? '',
    isComplete: isComplete ?? false,
    children: children ?? new Map(),
  };
}

/** Trie 노드를 수정합니다. */
function setTrieNode<Key extends keyof TrieNode>(trieNode: TrieNode, key: Key, value: TrieNode[Key]) {
  const settedTrieNode = { ...trieNode };
  settedTrieNode[key] = value;
  return settedTrieNode;
}

function insertMany(node: TrieNode, strs: string[]): TrieNode {
  const insertedNode = strs.reduce((prevNode, str) => {
    return insert(prevNode, str);
  }, node);

  return insertedNode;
}

/** Trie 노드에 단어를 삽입합니다. */
function insert(node: TrieNode, str: string): TrieNode {
  if (str.length === 0) {
    return setTrieNode(node, 'isComplete', true);
  }

  const char = str[0];
  const nextNode: TrieNode = node.children.get(char) ?? createTrieNode({ str: node.str + char });
  const nextWord: string = str.slice(1);
  const insertedNextNode = insert(nextNode, nextWord);

  const children: Map<string, TrieNode> = new Map(node.children).set(char, insertedNextNode);

  //사전순으로 정렬
  const sortedChildren = new Map(Array.from(children).sort());

  return setTrieNode(node, 'children', sortedChildren);
}
