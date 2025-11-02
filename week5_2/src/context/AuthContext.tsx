// 내가 프로젝트에서 로그인/로그아웃과 토큰 관리를 위해 직접 작성한 인증 컨텍스트 파일입니다.
import { createContext, PropsWithChildren, useState, useContext } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

// 인증 관련 데이터와 함수를 제공하는 컨텍스트 타입입니다.
interface AuthContextType {
  // 내가 사용하는 접근 토큰과 리프레시 토큰을 보관합니다.
  accessToken: string | null;
  refreshToken: string | null;
  // 로그인 함수: 서버에 로그인 요청을 보내 토큰을 로컬스토리지와 상태에 저장합니다.
  login: (signInData: RequestSigninDto) => Promise<void>;
  // 로그아웃 함수: 서버에 로그아웃 요청을 보내 로컬 토큰을 제거합니다.
  logout: () => Promise<void>;
}

// 기본값을 설정해 AuthContext를 생성합니다.
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 로컬스토리지에 접근하기 위해 내가 만든 커스텀 훅을 사용합니다.
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

  // 초기 상태는 로컬스토리지에 저장된 토큰을 불러와 설정합니다.
  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  // 로그인: 성공하면 토큰을 저장하고 내가 사용하는 페이지로 이동합니다.
  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        setAccessTokenInStorage(newAccessToken);
        setRefreshTokenInStorage(newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        // 사용자 경험을 위해 간단히 알림과 리다이렉트를 합니다.
        alert("로그인 성공");
        window.location.href = "/my";
      }
    } catch (error) {
      // 로그인 실패 시 콘솔에 남기고 사용자에게 알립니다.
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  // 로그아웃: 서버에 로그아웃 요청 후 내 로컬 토큰을 제거합니다.
  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();

      setAccessToken(null);
      setRefreshTokenInStorage(null);

      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  // 컨텍스트를 편하게 쓰기 위한 내가 만든 커스텀 훅입니다.
  // 컨텍스트가 없으면 내가 실수를 빨리 찾기 위해 에러를 던집니다.
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }

  return context;
};
