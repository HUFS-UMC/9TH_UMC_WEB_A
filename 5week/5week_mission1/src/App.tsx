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


const publicRoutes: RouteObject[] = [{
    path : "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      { path: "signup", element: <SignupPage /> },
      { path: "my", element: <MyPage /> },

    ]
  
  
}
]

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



const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])
function App(){
  return(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  )
}
export default App;


