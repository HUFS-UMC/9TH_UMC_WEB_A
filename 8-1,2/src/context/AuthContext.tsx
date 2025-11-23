

import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { useState, createContext, useContext } from "react";
import type { PropsWithChildren } from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// ✅ 가드 사용을 위해 초기값을 null로
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  // ✅ lazy initialization: 함수로 감싸서 첫 마운트 1회만 실행
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    getRefreshTokenFromStorage()
  );

  const login = async (signData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signData);
      if (data) {
        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        alert("로그인 성공");
        window.location.href = "/my";
      }
    } catch (error) {
      console.error("로그인 오류", error); // TODO: toast로 교체
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      alert("로그아웃 성공"); // API가 성공했을 때만 성공 메시지를 보여줍니다.
    } catch (error) {
      // 404 에러가 나더라도 토큰 삭제는 진행되므로, 에러를 기록만 합니다.
      console.error(
        "로그아웃 API 오류 발생. (프론트엔드 상태는 초기화됨)",
        error
      );
      alert("로그아웃 처리 중 오류 발생 (하지만 안전하게 토큰은 삭제됩니다)"); // 사용자에게 오류 발생 사실을 알립니다.
    } finally {
      // API 성공/실패와 관계없이 무조건 실행되어 토큰을 지웁니다.
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null); // 로그아웃 후 로그인 페이지로 이동합니다.
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "AuthContext를 찾을 수 없습니다. AuthProvider로 감싸주세요."
    );
  }
  return context;
};
