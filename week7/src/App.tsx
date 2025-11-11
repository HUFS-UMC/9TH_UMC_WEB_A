import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/protectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage";

// 인증이 필요 없는 public routes
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
      { path: "lps/:lpId", element: <LpDetailPage /> },
    ],
  },
];

// 인증이 필요한 protected routes
const protectedRoutes: RouteObject[] = [
  {
    path: "/my",
    element: (
      <AuthProvider>
        <ProtectedLayout />
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: "/my", // /my 경로로 접근 시 MyPage 렌더링
        element: <MyPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
