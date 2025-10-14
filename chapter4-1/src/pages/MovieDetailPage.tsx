// src/pages/MovieDetailPage.tsx
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useMemo } from "react";
import type { Movie, Credits } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 1. useMemo를 사용해 options 객체를 안정화하여 무한 루프를 방지합니다.
  const fetchOptions = useMemo(() => ({}), []);

  // 영화 상세 정보 패칭
  const {
    data: movieData,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useCustomFetch<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    fetchOptions // 안정화된 객체 전달
  );

  // 배우 정보 패칭
  const {
    data: creditsData,
    isPending: isCreditsPending,
    isError: isCreditsError,
  } = useCustomFetch<Credits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    fetchOptions // 안정화된 객체 전달
  );

  // 로딩 상태 처리
  if (isMoviePending || isCreditsPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (isMovieError || isCreditsError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>영화 정보를 불러오는 중 에러가 발생했습니다.</p>
      </div>
    );
  }

  // 데이터 없음 처리
  if (!movieData) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>영화 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const movie = movieData;
  const cast = creditsData?.cast.slice(0, 12) || [];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-white text-center md:text-left md:w-2/3">
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-xl mb-4">
              평점 {movie.vote_average.toFixed(1)}점 |{" "}
              {movie.release_date.substring(0, 4)} | {movie.runtime}분
            </p>
            <p className="text-lg leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mt-10 mb-6 border-b-2 border-gray-300 pb-2">
          감독/출연
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cast.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-center text-center"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : "https://via.placeholder.com/200?text=No+Image"
                }
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <p className="font-semibold text-sm mt-2">{person.name}</p>
              <p className="text-xs text-gray-500">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
