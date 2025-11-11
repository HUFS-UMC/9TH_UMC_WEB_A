//리다이렉트 된 페이지

import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    //2
    LOCAL_STORAGE_KEY.accessToken //1
  );
  //1) LOCAL_STORAGE_KEY는 키(key) 이름을 한 곳에 모아둔 객체인데 거기서 "accessToke"이라는 문자열을 가져온다.
  //2) useLocalStorage에 key에 accesstoken을 넣으면
  //{
  //   setItem: (value) => window.localStorage.setItem("accessToken", JSON.stringify(value)),
  //   getItem: () => JSON.parse(window.localStorage.getItem("accessToken")),
  //   removeItem: () => window.localStorage.removeItem("accessToken")
  // }
  //이런 객체를 반환하고 그중 setItem을 setAccessToken이라고 하겠다.
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken"); // 이름 통일
    const refreshToken = params.get("refreshToken"); // 이름 통일
    const userId = params.get("userId"); // 이름 통일
    const name = params.get("name");

    if (accessToken) {
      setAccessToken(accessToken);
      if (refreshToken) setRefreshToken(refreshToken);
      window.location.href = "/my"; // 절대 경로
      // 또는: const nav = useNavigate(); nav("/my");
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>구글로그인리다이렉트화면</div>;
};

export default GoogleLoginRedirectPage;

// setAccessToken, setRefreshToken]은 **"React의 Hook 규칙 때문에 넣은 것"**이에요.
// “논리적인 동작을 바꾸기 위해서” 넣은 게 아니라,
// “React가 경고(Eslint warning)를 띄우지 않게 하기 위해서”
