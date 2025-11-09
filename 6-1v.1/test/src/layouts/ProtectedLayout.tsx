// 토큰이 필요한 페이지는 볼수 있게하고 토큰이 없으면 로그인 페이지로 이동시켜 버린다.
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";


const protectedLayout = () => {
  const { accessToken } = useAuth();
  //   console.log("ProtectedLayout에서 확인한 Access Token:", accessToken); //

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
    //replace - history애 남지 않는다.
  }
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default protectedLayout;
