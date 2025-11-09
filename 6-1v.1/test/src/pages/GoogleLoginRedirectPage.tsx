import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

// 백엔드 쿼리 키 (백엔드와 반드시 일치시켜 주세요)
const QUERY_KEY = {
  access: "access",
  refresh: "refresh",
  id: "id",
  name: "name",
  state: "state",
  error: "error",
} as const;

function getAllParams() {
  // 1) 기본: ?query
  const searchParams = new URLSearchParams(window.location.search);

  // 2) 보조: #hash (일부 프로바이더/리다이렉트 설정)
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  const hashParams = new URLSearchParams(hash);

  // 우선순위: search → hash
  const get = (key: string) => searchParams.get(key) ?? hashParams.get(key);

  return {
    access: get(QUERY_KEY.access),
    refresh: get(QUERY_KEY.refresh),
    id: get(QUERY_KEY.id),
    name: get(QUERY_KEY.name),
    state: get(QUERY_KEY.state),
    error: get(QUERY_KEY.error),
    hasAnyToken:
      !!(get(QUERY_KEY.access) || get(QUERY_KEY.refresh) || get(QUERY_KEY.error)),
  };
}

function clearUrlTokens() {
  // 토큰/민감 쿼리스트링을 주소창에서 제거 (보안/UX)
  const url = new URL(window.location.href);
  url.search = ""; // 쿼리 제거
  url.hash = "";   // 해시 제거
  // 같은 페이지로 URL만 교체
  window.history.replaceState({}, document.title, url.toString());
}

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  useEffect(() => {
    const { access, refresh, id, name, state, error, hasAnyToken } = getAllParams();

    // 아무 파라미터도 없으면 조용히 리턴 (직접 진입 등)
    if (!hasAnyToken) return;

    // URL 정리(항상 먼저) — 새로고침/뒤로가기에도 토큰이 남지 않도록
    clearUrlTokens();

    if (error) {
      console.error("OAuth error:", error, "state:", state ?? "(none)");
      // TODO: 에러 토스트를 띄우거나 에러 페이지로 이동
      // window.location.replace("/login?oauth=fail");
      return;
    }

    if (access) {
      setAccessToken(access);
      if (refresh) setRefreshToken(refresh);

      // 필요 시 사용자 정보 저장
      // if (id)   localStorage.setItem("userId", id);
      // if (name) localStorage.setItem("userName", name);

      // 뒤로 가기로 리다이렉트 페이지 안 돌아오게
      window.location.replace("/my");
      return;
    }

    // 여기까지 왔는데 토큰이 없다? 실패 처리
    console.warn("OAuth redirect: token not found in query/hash. state =", state);
    // window.location.replace("/login?oauth=fail");
  }, [setAccessToken, setRefreshToken]);

  return <div>구글 로그인 리다이렉트 처리 중…</div>;
};

export default GoogleLoginRedirectPage;
