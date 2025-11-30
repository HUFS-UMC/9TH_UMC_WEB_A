import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const protectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />; //replace는 history가 남지 않음
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