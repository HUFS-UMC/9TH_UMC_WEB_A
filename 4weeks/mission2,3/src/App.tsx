import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Mypage from "./pages/MyPage";
// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,                
    errorElement: <div>Error</div>,
    children: [
      { index: true, element: <HomePage /> }, 
      
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
//// const router = createBrowserRouter([라우터 연결 해주는 부분


// {path:'login',element:<LoginPage/>} path가 / 이기 때문에url 은  /login하면 login page에 접근되야 한다.