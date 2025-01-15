# modules

`modules` 모듈을 모아둔 폴더입니다.
이 폴더에 포함된 각 모듈은 독립적이고 프로젝트 전반에서 재사용할 수 있어야 합니다.
이 문서는 `moudules` 폴더에 관해 설명합니다.

## 목표

`modules`에 포함된 모든 모듈이 일관된 방법으로 사용되는것을 목표로 합니다.  
아래와 같은 방법으로 사용되기 위해 각 모듈은 이 문서에서 제시된 컨벤션을 따라야합니다.

```ts
// 다른 모듈 또는 컴포넌트에서

import Foo from '@modules/foo-module';

const name = Foo.getName();
const result = Foo.calc(5, 20);
```

## 컨벤션

`modules`폴더 하위의 각 폴더는 모듈 폴더를 의미합니다.  
모듈 폴더의 이름은 kebab-case로 작성되어야 합니다.

```
modules
├ foo-module
└ bar-module
```

---

모듈 폴더 최상위에는 `index.ts`가 반드시 있어야하고 필요에 따라 `external.ts`를 포함할 수 있습니다.
이 외의 코드는 모두 `src`폴더에 포함됩니다.

```
modules/foo-module
├ index.ts
├ external.ts
└ src
  ├ main.ts
  ├ utils.ts
  └ ...
```

---

`index.ts` 파일에서 모듈을 반드시 `export default`해야합니다. 모듈의 이름은 PascalCase로 작성되어야 합니다. 선택적으로 다른 `export`를 할 수 있습니다.

```ts
// modules/foo-module/index.ts

import * as Foo from './external';

// 필수
export default Foo;

// 선택
export * from './external';
export { Foo };
```

---

모듈 폴더 외부에선 모듈 폴더의 `index.ts`를 통해서만 `import` 해야합니다.

```
modules/foo-module
├ index.ts
└ src
  └ utils.ts
```

```ts
//다른 모듈 또는 컴포넌트에서

// 가능
import Foo from '@/modules/foo-module';
import Foo from '@/modules/foo-module/index.ts';

// 불가
import { getName } from '@/modules/foo-module/src/utils.ts';
```

---

같은 방식으로 하위 모듈을 포함 할 수 있습니다.  
하위 모듈에는 상위 모듈만 접근할 수 있고 상위 모듈 외부에선 접근할 수 없습니다.

```
modules/foo-module
├ index.ts
├ src
│ └ ...
└ sub-module
  ├ index.ts
  └ src
    └ ...
```

```ts
// 가능 - 상위 모듈에서
import Sub from './sub-module';

// 불가 - 다른 모듈 또는 컴포넌트에서
import Sub from '@/modules/foo-module/sub-module';
```
