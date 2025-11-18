import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HamburgerButton } from "./HamburgerButton";
import { useSidebar } from "../hooks/useSidebar";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
  const { isOpen, toggle, close } = useSidebar();
  const { accessToken } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <HamburgerButton isOpen={isOpen} onClick={toggle} />
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <Link
              to={"/my"}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              마이 페이지
            </Link>
          )}
          <Link
            to={"/search"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색
          </Link>
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={close} />
    </nav>
  );
};

export default Navbar;
