import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layout/HomeLayout';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />}, //홈 경로일 때
      {path: 'login', element: <LoginPage />},
      {path: 'signup', element: <SignupPage />},
    ]
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
