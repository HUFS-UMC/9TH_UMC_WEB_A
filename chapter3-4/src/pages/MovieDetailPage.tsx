import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

// Movie 타입 불러오기
type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
};

// Cast 타입 불러오기
type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

const MovieDetailPage = () => {
  // 각 값을 초기화 하기
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  // 렌더링시 실행 && 의존성 배열에 변화가 있을 때 실행
  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!movieId) return; // movieId를 못 찾으면 함수 종료

      setIsPending(true);
      setIsError(false);

      // try-catch-finally를 사용하여 API와 같은 실패 확률 높은 거부터 시도해보고 오류나면 catch로 넘어가기 / finally는 오류와 상관없이 작동
      try {
        const movieResponse = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const creditsResponse = await axios.get<{ cast: Cast[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 12));
      } catch (error) {
        console.error("영화 정보 불러오기 실패", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>영화 못 불러옴</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>영화 정보를 못 찾음</p>
      </div>
    );
  }

  // 화면 구성
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
