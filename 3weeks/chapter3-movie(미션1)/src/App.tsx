import './App.css';
import type { JSX } from 'react';
import MoviePage from './pages/MoviePage';


function App(): JSX.Element {
  console.log(import.meta.env.VITE_TMDB_ACCESS_TOKEN);
  return (
    <>
    <MoviePage/>
    </>
  );
}

export default App;
