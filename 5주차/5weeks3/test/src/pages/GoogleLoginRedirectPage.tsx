import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage }  from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAcessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAcessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href="/my";
    }
  }, [setAcessToken,setRefreshToken]);

  return <div>구글 로그인 리다이렉 화면</div>;
};

export default GoogleLoginRedirectPage;

// useparmas 4개의 쿼리 파라미터(id/name/access/refresh)

//window는 그뒤에 쿼리 파라피터
