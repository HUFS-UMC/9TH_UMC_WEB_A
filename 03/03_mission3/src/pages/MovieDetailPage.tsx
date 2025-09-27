import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { MovieDetail, Credits } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const detailPromise = axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const creditPromise = axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const [detailRes, creditRes] = await Promise.all([
          detailPromise,
          creditPromise,
        ]);

        setMovie(detailRes.data);
        setCredits(creditRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
      </div>
    );
  }

  if (!movie || !credits) {
    return <div>!movie</div>;
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="px-4 py-8">
          <img
            className="w-full"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
          <h1 className="text-3xl mt-5 font-semibold">{movie.title}</h1>
          <p className="mt-2">평균 {movie.vote_average}</p>
          <p className="mt-1">개봉일 {movie.release_date}</p>
          <p className="mt-1">{movie.tagline}</p>
          <p className="mt-1">{movie.overview}</p>

          <h1 className="text-3xl mt-5 font-semibold">감독/출연</h1>
          <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {credits.crew.map((person) => (
              <div key={person.credit_id}>
                <img
                  className="rounded-full w-30"
                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                />
                <p>{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
