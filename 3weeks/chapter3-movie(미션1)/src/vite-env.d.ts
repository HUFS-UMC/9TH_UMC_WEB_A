//vite의 환경변수
/// <reference types="vite/client" />
///// <reference ... /> → TS 전용 지시어 (주석이 아니라 컴파일러에게 전달되는 명령)
//import.meta와 import.meta.env 같은 Vite 전용 타입들이 인식돼서 자동완성과 타입체크가 잘 돼요.
interface ImportMetaEnv {
  readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

// ---------------------------------------------------
// 1. 원래 있는 객체
// ---------------------------------------------------
// Vite 프로젝트에서는 전역(global)으로 import.meta라는 객체가 있어요.
// 그 안에 env라는 속성이 들어 있고, 여기에 .env 파일에 정의한 값들이 들어옵니다.
//
// 예시:
//
// console.log(import.meta.env);
// // 출력 예시
// {
//   VITE_TMDB_KEY: "abcd1234", // .env에서 가져온 값
//   BASE_URL: "/",
//   MODE: "development",
//   ...
// }

// ---------------------------------------------------
// 2. 문제: 타입스크립트는 몰라요
// ---------------------------------------------------
// TypeScript는 기본적으로
//
//   import.meta.env.VITE_TMDB_KEY
//
// 이게 뭔지 잘 몰라서 any처럼 취급하거나, 빨간 줄을 띄울 수 있어요.
// "너 지금 뭘 쓰려는 거야? 그 속성이 진짜 있는 거 맞아?" 라고 묻는 거죠.

// ---------------------------------------------------
// 3. 그래서 interface ImportMetaEnv
// ---------------------------------------------------
//interface ImportMetaEnv {
  //readonly VITE_TMDB_KEY: string;
//}
// ➡️ "env 안에는 VITE_TMDB_KEY라는 값이 있고, string 타입이야"
// 라고 미리 알려주는 거예요.
// 즉, .env에서 가져온 값이 문자열이라는 타입 정보를 부여한 거죠.

// ---------------------------------------------------
// 4. interface ImportMeta
// ---------------------------------------------------
//interface ImportMeta {
//  readonly env: ImportMetaEnv;
//}
// ➡️ "import.meta라는 전역 객체 안에 env라는 속성이 있고,
// 그 속성의 구조는 방금 정의한 ImportMetaEnv랑 똑같아"
// 라고 알려주는 겁니다.

// ---------------------------------------------------
// 5. 결과
// -----------------------------------------
