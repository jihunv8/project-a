# app

`app` 폴더는 `Next.js`의 `App Router` 폴더 입니다.
이 문서는 `Next.js`의 `App Router`지침 외의 `app`폴더에서 따라야하는 컨벤션에 대해 설명합니다.

## 기본 컨벤션

Storybook의 스토리와 css관련 스타일 파일은 `page.tsx`와 같은 곳에 위치해야합니다.

```
page
├ page.module.scss
├ page.stories.ts
└ page.tsx
```

## 컴포넌트 컨벤션

### 목표

컴포넌트 컨벤션은 컴포넌트의 상관관계를 쉽게 파악하여 유지보수가 용이하게 하는 것을 목표로 작성되었습니다.

예시

```
src/app
├ _components
│ ├ buttons
│ │ ├ CommonButton
│ │ └ RadioButton
└ sub-page
  └ _components
    └ ButtonForSubPage
```

### 컴포넌트 위치

컴포넌트는 각 페이지의 `_components`폴더에 포함되어야 합니다.  
상위 페이지는 하위 페이지의 `_components`에 접근할 수 없습니다.  
아래의 예시에서 `/sub-page`에선 `CommonButton`을 사용할 수 있지만 `/`에선 `ButtonForSubPage`를 사용할 수 없습니다.

`src/app/_components`폴더는 모든 페이지에서 재사용 할 수 있는 컴포넌트를 위치시키기 좋은 장소입니다.

```
src/app
├ _components
│ └ CommonButton
└ sub-page
  └ _components
    └ ButtonForSubPage
```

카테고리 폴더를 생성해 비슷한 유형의 컴포넌트를 묶을 수 있습니다.  
카테고리 폴더 이름은 kebab-case로 작성되어야 합니다.

```
src/app
└ _components
  ├ buttons
  │ ├ CommonButton
  │ └ RadioButton
  └ inputs-for-user
    ├ NameInput
    └ PasswordInput
```

### 컴포넌트 폴더

컴포넌트 폴더는 컴포넌트가 정의된 `index.tsx`파일을 포함하는 폴더를 말합니다.  
이 폴더는 컴포넌트와 이름이 같아야합니다.

```
MainComponent
└ index.tsx
```

```ts
// index.tsx
export function MainComponent() { ... }
```

컴포넌트의 스토리, 스타일 파일은 `index.tsx`와 같은 곳에 위치합니다.

```
MainComponent
├ index.module.scss
├ index.stories.ts
└ index.tsx
```

컴포넌트와 관련된 로직은 src폴더에 위치합니다.

```
MainComponent
├ src
│ ├ utils.ts
│ └ ...
└ ...
```

컴포넌트 폴더는 하위 컴포넌트 폴더를 포함할 수 있습니다. 하위 컴포넌트 폴더도 동일한 구조를 가지고 있습니다.

```
MainComponent
├ SubComponent1
│ └ ...
├ SubComponent2
│ └ ...
└ ...
```

```ts
// index.tsx
export function MainComponent() { ... }
```
