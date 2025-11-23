import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Movie = {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type Crew = {
  id: number;
  name: string;
  job: string;
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<string>("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        // 영화 상세
        const { data: movieData } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(movieData);

        // 영화 크레딧
        const { data: credits } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setCast(credits.cast.slice(0, 6));
        const directorObj = credits.crew.find(
          (c: Crew) => c.job === "Director"
        );
        setDirector(directorObj?.name || "정보 없음");
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-2 text-gray-400">Release Date: {movie.release_date}</p>
      <p className="mb-4">{movie.overview}</p>

      <h2 className="text-2xl font-semibold mb-2">Director</h2>
      <p className="mb-4">{director}</p>

      <h2 className="text-2xl font-semibold mb-2">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cast.map((actor) => (
          <div key={actor.id} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="rounded-lg mb-2"
            />
            <p className="text-sm font-medium">{actor.name}</p>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
