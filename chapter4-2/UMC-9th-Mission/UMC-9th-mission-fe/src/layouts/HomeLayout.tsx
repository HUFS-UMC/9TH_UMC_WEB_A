import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>메뉴</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>하단</footer>
    </div>
  );
};

export default HomeLayout;
