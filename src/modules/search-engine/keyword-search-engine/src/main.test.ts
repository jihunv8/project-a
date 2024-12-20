import { SearchResult, createKeywordSearchEngine } from './main';

type TestPerson = {
  id: string;
  name: string;
  age: number;
  job: string;
};

function checkEqual(searchResult: SearchResult<TestPerson>, expectIds: string[]) {
  expect(searchResult.items.map((el) => el.id).toSorted()).toEqual(expectIds.toSorted());
}

const data: { [id: string]: TestPerson } = {
  0: { id: '0', name: 'foo', age: 20, job: 'front end' },
  1: { id: '1', name: 'bar', age: 22, job: 'back end' },
  2: { id: '2', name: 'bizz', age: 24, job: 'front end' },
  3: { id: '3', name: 'buzz', age: 26, job: 'full stack' },
  4: { id: '4', name: 'ronald speirs', age: 28, job: 'back end' },
  5: { id: '5', name: 'edward shames', age: 30, job: 'full stack' },
  6: { id: '6', name: 'carwood lipton', age: 30, job: 'chief executive officer' },
};

const engine = createKeywordSearchEngine(data, (element) => {
  return [element.name, element.job];
});

describe('search test', () => {
  test('전체 키워드로 검색 테스트', () => {
    // 이름
    checkEqual(engine.search('foo'), ['0']);
    checkEqual(engine.search('bar'), ['1']);
    checkEqual(engine.search('bizz'), ['2']);
    checkEqual(engine.search('buzz'), ['3']);
    checkEqual(engine.search('ronald speirs'), ['4']);
    checkEqual(engine.search('edward shames'), ['5']);
    checkEqual(engine.search('carwood lipton'), ['6']);

    // 직업
    checkEqual(engine.search('front end'), ['0', '2']);
    checkEqual(engine.search('back end'), ['1', '4']);
    checkEqual(engine.search('full stack'), ['3', '5']);
    checkEqual(engine.search('chief executive officer'), ['6']);
  });

  test('첫번째 최소 단위 키워드로 검색 테스트', () => {
    // 이름
    checkEqual(engine.search('ronald'), ['4']);
    checkEqual(engine.search('edward'), ['5']);
    checkEqual(engine.search('carwood'), ['6']);

    // 직업
    checkEqual(engine.search('front'), ['0', '2']);
    checkEqual(engine.search('back'), ['1', '4']);
    checkEqual(engine.search('full'), ['3', '5']);
    checkEqual(engine.search('chief'), ['6']);
  });

  test('첫번째가 아닌 최소 단위 키워드로 검색 테스트', () => {
    // 이름
    checkEqual(engine.search('speirs'), ['4']);
    checkEqual(engine.search('shames'), ['5']);
    checkEqual(engine.search('lipton'), ['6']);

    // 직업
    checkEqual(engine.search('end'), ['0', '1', '2', '4']);
    checkEqual(engine.search('stack'), ['3', '5']);
    checkEqual(engine.search('officer'), ['6']);
    checkEqual(engine.search('executive'), ['6']);
  });

  test('완성되지 않은 키워드로 검색 테스트', () => {
    checkEqual(engine.search('fo'), ['0']);
    checkEqual(engine.search('b'), ['1', '2', '3', '4']);
    checkEqual(engine.search('s'), ['3', '4', '5']);
  });
});

// TODO: search 메서드 테스트코드 작성
// describe('search test', () => {});
