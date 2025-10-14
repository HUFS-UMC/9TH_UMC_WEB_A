import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// Outlet은 특정 영역에만 URL에 따라 동적으로 사용하고 싶을 때 사용

export default HomePage;
