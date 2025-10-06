import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

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

type Credits = {
  cast: Cast[];
  crew: Crew[];
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 커스텀 훅 사용
  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useCustomFetch<Movie>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  );

  const {
    data: credits,
    loading: creditsLoading,
    error: creditsError,
  } = useCustomFetch<Credits>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
  );
  // 조건부 렌더링 - 현재 상태에 따라 다른 화면을 보여주는 로직
  // 1. movieLoading or creditsLoading 중 하나라도 T라면 (즉 데이터를 불러오는 중이라면)
  // div 내용을 즉시 반환, "로딩중" 뜸
  // => 데이터 준비되기 전에는 화면에 아무것도 안그리고 로딩화면만 띄워줌
  if (movieLoading || creditsLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading movie details...</p>
      </div>
    );

  // 2. 영화정보 API or 크레딧 API 중 하나라도 에러 발생 시 에러메세지 띄워줌.
  if (movieError || creditsError)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400">
        <p>{movieError || creditsError}</p>
      </div>
    );

  // 3. movie or credtis가 null인 경우 에러메세지
  if (!movie || !credits)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>영화 정보를 불러올 수 없습니다.</p>
      </div>
    );

  const director =
    credits.crew.find((c) => c.job === "Director")?.name || "정보 없음";
  const cast = credits.cast.slice(0, 5);

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl shadow-lg max-w-sm"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2 text-gray-400">
            Release Date: {movie.release_date}
          </p>
          <p className="mb-6 leading-relaxed">{movie.overview}</p>

          <h2 className="text-2xl font-semibold mb-2">Director</h2>
          <p className="mb-6 text-lg">{director}</p>

          <h2 className="text-2xl font-semibold mb-2">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="flex flex-col items-center bg-gray-800 rounded-xl p-2 shadow-md hover:scale-105 transition-transform"
              >
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
      </div>
    </div>
  );
};

export default MovieDetailPage;
