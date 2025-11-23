import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface ProtectedRouteProps {
  children: React.ReactNode; // JSX.Element → React.ReactNode 로 변경
  requiredPremium?: boolean;
}

const ProtectedRoute = ({ children, requiredPremium = false }: ProtectedRouteProps) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const token = getItem();
  const user = getItem(); // 필요하면 유저 정보도 localStorage에 저장 가능

  // 로그인 안 된 경우 → 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 프리미엄 유저만 접근 가능하게 하고 싶을 때
  if (requiredPremium && !user?.isPremium) {
    return <Navigate to="/payment" replace />; // 결제 페이지로 이동
  }

  return children;
};

export default ProtectedRoute;
