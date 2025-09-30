import { useSyncExternalStore, type ReactNode, type MouseEvent } from "react";
import NotFound from "./pages/NotFound";

//1.navigate + history API
export function navigate(to: string, replace = false) { //navigate라는 경로 이동함수를 선언 해준다. 
  if (replace) history.replaceState({}, "", to); // replace가 true면 replaceState()로 현재 히스토리를 덮어씀
  else history.pushState({}, "", to);//false면 pushState 로 히스토리에 새 항목 추가.
  //둘의 차이:각 파라미터의 역할은 pushState과 같다. 다만, replaceState는 세션 히스토리에 새 url 상태를 쌓지 않고, 현재 url을 대체한다.
  window.dispatchEvent(new PopStateEvent("popstate")); 
  // PopStateEvent: 원래는 뒤로가기/앞으로가기 같은 히스토리 이동 때 브라우저가 자동 발생시키는 이벤트
// 문제: pushState나 replaceState는 주소만 바꾸고 이 이벤트를 안 날려줌
// 해결책: 그래서 new PopStateEvent("popstate")로 가짜 이벤트를 직접 만들어서,
//         window.dispatchEvent(...)로 강제로 발생시킴
  // 이게 없으면 새페이지로 전환되지 않을 수 있다.
}



//2. useLocation 훅
function useLocation() { 
  // 현재 주소를 React에서 상태처럼 쓰게 해주는 훅

  // popstate 이벤트(뒤로가기/앞으로가기 발생 시) 구독
  const subscribe = (callback: () => void) => {
    window.addEventListener("popstate", callback);//브라우저에 “popstate 이벤트(poststae = 뒤로가기 앞으로가기)가 발생하면 callback를 실행해라”라고 등록.
    return () => window.removeEventListener("popstate", callback);//이렇게 해야 컴포넌트가 사라졌을 때 불필요하게 이벤트가 계속 남아있지 않음
  };

  //() : 인자를 받지 않는 함수 => void : 반환값이 없는 함수 그리고 이함수 가 매개변수,

  // 현재 주소(pathname) 가져오기
  const get = () => window.location.pathname;

  // 주소 변경 감지 → React 상태처럼 동작
  return useSyncExternalStore(subscribe, get, get);
}


export type Route = { path: string; element: ReactNode }; // route타입을 정의,path: 문자열 주소 ("/about", "/movies"),element: 그 주소에서 보여줄 React 컴포넌트(JSX).

//3. Router와 Link
//router
export function Router({ routes }: { routes: Route[] }) {
  const pathname = useLocation(); // 현재 주소 가져오기
  const match = routes.find(r => r.path === pathname); // 경로 매칭
  return match ? <>{match.element}</> : <NotFound />; // 맞으면 컴포넌트, 없으면 NotFound
}
//link 일반 <a> → 전체 새로고침" vs "Link" → "주소만 바꾸고 화면만 교체(이게 이 link컴포넌트를 선언한 이유다)
export function Link({
  to,
  children,
  replace = false,
  className,
}: {
  to: string;
  children: ReactNode;
  replace?: boolean;
  className?: string;
}) {
 const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // e.preventDefault()로 a 태그의 기본 동작(서버 요청 + 새로고침) 막음
  if (window.location.pathname !== to) { // 지금 주소와 이동하려는 주소가 다를 때만
    navigate(to, replace);               // History API로 주소만 바꾸고 → SPA 방식 화면 전환
  }
};

  return (
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  ); //겉모습은 <a> 태그지만, 사실은 클릭하면 새로고침 없이 SPA 네비게이션이 실행되도록 만든 JSX 반환 부분
}


// 원래 <a> 태그
// <a href="/home">Home</a>
// 클릭하면 브라우저가 서버에 /home 요청을 보냄 → 전체 페이지 새로고침 → /home 페이지를 서버에서 다시 불러옴.
// 즉, "그 페이지로 가긴 하는데, 화면 전체가 갈아끼워짐."
//
// Link 컴포넌트
// 겉모습은 <a>랑 똑같이 보이지만,
// e.preventDefault()로 서버 요청(새로고침)을 막고,
// 대신 navigate("/home")으로 주소만 바꿈.
// 그럼 React가 현재 화면 안에서 필요한 컴포넌트만 교체해줌.













// hisory api필요성:전통적 웹은 문서 → 링크 클릭 → 서버 요청 → 전체 페이지 재로딩
//문제점:너무느림  ->해결책:History API 덕분에 “주소는 바꾸되 전체 리로드는 하지 않기”
//history api란?
// 세션 히스토리(방문 기록 스택)**를 자바스크립트로 제어할 수 있게 해주는 API야,history api 덕분에 주소창만 바꾸고, 전체 새로고침 없이 화면만 바꾸는 것이 가능해짐
//한번 쌓인 기록은 지워지지 않고 계속 남아 있고, 사용자는 포인터를 움직이며 위차만 바꿔주는것이다.

//코드 설명전 할말:window는 window는 코드 안에서 따로 import하지 않았는데도 바로 쓰고 있음.
//window는 브라우저가 전역(Global)으로 제공하는 객체

//브라우저 환경에서는 모든 탭/창에 대해 window라는 객체가 기본으로 존재함