import './App.css';
import HomePage from './pages/home';
import MoviesPage from './pages/movies';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/not-found';
import MovieDetailPage from './pages/movieDetail';

const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>,
      errorElement: <NotFound />,
      children: [
        {
          path: 'movies/:category',
          element: <MoviesPage />,
        },
        {
          path: 'movies/:movieId',
          element: <MovieDetailPage />
        },
      ],
    },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;