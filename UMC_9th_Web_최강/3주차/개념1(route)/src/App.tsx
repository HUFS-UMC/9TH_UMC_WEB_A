import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './components/home'
import MoviesPage from './components/movies'
import NotFound from './components/NotFound'
import RootLayout from './layout/root-layout'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, 
        element: <HomePage />
      },
      {
        path: 'movies/:movieId?',
        element: <MoviesPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App