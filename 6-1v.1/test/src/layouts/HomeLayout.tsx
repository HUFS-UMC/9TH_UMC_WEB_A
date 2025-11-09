import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const HomeLayout = () => {
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

export default HomeLayout;

//로그인 경로인데도 홈페이지가 뜨는 이유 : children 들이 .
//element에는 공유하는 레이아웃들 적어주고
