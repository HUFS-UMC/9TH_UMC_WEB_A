import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
// 1.홈페이지
// 2.로그인 페이지
// 3.회원가입 페이지

//publicRoutes:인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];
//protextedRoutes:인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: "my", element: <MyPage /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,// 쿼리에 관한 요청은 3번: homepage에서 retry
    },
  },
});
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* React Query의 전역 상태 관리 컨테이너예요.내부의 모든 컴포넌트들이 useQuery, useMutation 등 React Query 훅을 사용할 수 있게 함. */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {/* 배포환경일떄는 야자수(?)안뜨게 DEV->야자수O. PROD->야자수X*/}
      {/* React Query는 서버 데이터를 관리하는 라이브러리고,
ReactQueryDevtools는 그 상태를 시각적으로 보여주는 디버깅 도구예요. */}
{/* A && B 는 “A가 참이면 B를 실행(혹은 표시)” 라는 조건문 */}

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;

// element: 공유되는 구성들이 들어가야함  이게 app.tsx
