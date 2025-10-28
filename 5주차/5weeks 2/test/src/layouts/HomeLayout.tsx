import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>네비게이션 바</nav>
      <main className="flex-1"><Outlet/></main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
 

//로그인 경로인데도 홈페이지가 뜨는 이유 : children 들이 . 
//element에는 공유하는 레이아웃들 적어주고 