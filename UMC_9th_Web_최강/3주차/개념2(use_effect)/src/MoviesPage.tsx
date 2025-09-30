import { useEffect, useState } from "react";
import type{ Movie, MovieResponse } from "./types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [ movies, setMovies] = useState<Movie[]>([]);
  
  console.log([...movies])

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDMxNDM1NWI4NzRkM2NlZDMxNGM2ZTlkNzdhM2MxZCIsIm5iZiI6MTc1OTA1NjQzNy4wMzksInN1YiI6IjY4ZDkxMjM1ODk5YTVhNWNmOGJiMDY5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zeC20dfGSXA4dwaVzxmtfjHrJjNKFzYxD6GOLwOhSis'
          }
        }
      )
      setMovies(data.results)
    }
    fetchMovies();
  }, []);

  

  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  )
};

export default MoviesPage;