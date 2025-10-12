import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";

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

// Crew type removed (not used directly)

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [director, setDirector] = useState<string>("");

  const movieUrl = movieId ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR` : null;
  const creditsUrl = movieId ? `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR` : null;

  const { data: movieData, loading: movieLoading } = useFetch<Movie>(
    movieUrl,
    [movieId],
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }
  );

  const { data: creditsData, loading: creditsLoading } = useFetch<any>(
    creditsUrl,
    [movieId],
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }
  );

  // sync data when fetch completes
  useEffect(() => {
    if (movieData) setMovie(movieData as Movie);
  }, [movieData]);

  useEffect(() => {
    if (creditsData && creditsData.cast) {
      setCast((creditsData.cast as any[]).slice(0, 6));
      const directorObj = (creditsData.crew as any[]).find((c) => c.job === "Director");
      setDirector(directorObj?.name || "정보 없음");
    }
  }, [creditsData]);

  if (!movie || movieLoading || creditsLoading ) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              {movie.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full">
                {movie.release_date}
              </span>
              <span className="text-sm text-gray-400">관람 정보 · 한국어</span>
            </div>

            <p className="mt-6 text-gray-300 leading-relaxed max-w-3xl">{movie.overview}</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Director</h2>
              <p className="mt-1 text-gray-300">{director}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Cast</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="bg-gray-800 rounded-lg p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transform hover:-translate-y-1 transition"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : `https://via.placeholder.com/200x300?text=No+Image`
                      }
                      alt={actor.name}
                      className="w-24 h-32 object-cover rounded-md mb-2"
                    />
                    <p className="text-sm font-medium">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
