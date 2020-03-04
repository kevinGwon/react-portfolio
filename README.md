# react-portfolio

해당 Repository는 포트폴리오를 위한 저장소 입니다.

## Site

https://developergwon-react.netlify.com/

## 간단한 페이지 소개

- 해당 프로젝트는 CRA(Create React App)를 사용하지 않고 Webpack으로 구성하였습니다.
- 시멘틱 마크업으로 작성 하였습니다.
- RWD(Responsive Web Design)를 적용 하였습니다.
- Router를 이용하여 상세페이지로 이동합니다.
- 상태관리를 위해 `Redux`를 사용하였고 middleware는 `Redux-thunk`를 사용하였습니다.
- `React.memo, useCallback`을 적절히 사용하여 랜더링 최적화 하였습니다.

## Branch

master

- 최종 업로드 브랜치(최종 제출)

develop

- 개발하여 업로드되는 브랜치

## Spec

- webpack 4.x
- Husky, Prettier, Eslint
- React(16.12.x), Hooks, Redux, Redux-Thunk

## Editor

- VScode 사용
- ESLint, Prettier을 사용하기 위해 VScode extention 설치가 필요합니다.

[ESLint, Prettier 설치방법](https://velog.io/@velopert/eslint-and-prettier-in-react)

## 설치 준비

- npm으로 설치를 하기 위해선 [Node.js](https://nodejs.org/ko/) 설치가 필요합니다. 사이트에서 LTS버전을 다운 받고 설치를 하시기 바랍니다.
- Node.js 버전이 낮을경우 최신 상태로 설치하는걸 권장합니다.
- npm 대신 yarn을 이용하여 패키지를 관리합니다.

## 개발환경 실행

- yarn 설치

```
npm install --global yarn
```

- yarn 실행

```
yarn
```

## 실행

```
yarn start
```
