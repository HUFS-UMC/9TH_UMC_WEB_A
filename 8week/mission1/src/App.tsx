import {createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LpDetailPage from "./pages/LpDetailPage.tsx";
import ThrottlePage from "./pages/ThrottlePage.tsx";


const publicRoutes: RouteObject[] = [{
    path : "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      { path: "signup", element: <SignupPage /> },
      { path: "my", element: <MyPage /> },
      { path: "/v1/auth/google/callback", element: <GoogleLoginRedirectPage />},
      { path: `lps/:lpId`, element:<LpDetailPage />},
      { path: `/throttle`, element: <ThrottlePage/>},
    ],
},
];

const protectedRoutes: RouteObject[] = [{
    path : "/",
    element: <ProtectedLayout/>,
    errorElement: <NotFoundPage />,
    children: [
      { path: "my", 
        element: <MyPage /> },
    ]
  
  
}

]

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  }
});

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])
function App(){
  return(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {import.meta.env.DEV}&&<ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}
export default App;


