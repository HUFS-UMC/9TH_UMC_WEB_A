// src/pages/MovieDetailPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type Genre = { id: number; name: string };
type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres?: Genre[];
};

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const fetchMovieDetail = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false);
      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setMovie(data ?? null);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  const img = (p?: string | null) =>
    p ? `https://image.tmdb.org/t/p/w500${p}` : "";

  if (isPending) {
    return <div className="h-dvh grid place-items-center">로딩중</div>;
  }

  if (isError || !movie) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        >
          뒤로
        </button>
        <p className="mt-4 text-red-500">영화 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }

  const genres: Genre[] = movie.genres ?? [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-2 rounded bg-gray-800 text-white"
      >
        뒤로
      </button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 포스터 */}
        <div className="md:col-span-3 flex justify-center">
          {movie.poster_path ? (
            <img
              src={img(movie.poster_path)}
              alt={`${movie.title} 포스터`}
              className="block mx-auto rounded-xl shadow-lg w-64"
            />
          ) : (
            <div className="w-64 aspect-[2/3] rounded-xl bg-gray-200 grid place-items-center">
              이미지 없음
            </div>
          )}
        </div>

        {/* 텍스트 정보 */}
        <div className="md:col-span-3">
          <h1 className="mt-6 mb-4 text-3xl md:text-5xl lg:text-6xl text-center font-bold">
            &lt;{movie.title}&gt;
          </h1>

          <div className="mt-2 text-sm text-gray-600 flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span>개봉: {movie.release_date || "미상"}</span>
            {movie.runtime ? <span>• {movie.runtime}분</span> : null}
            {genres.length > 0 && (
              <span>• {genres.map((g: Genre) => g.name).join(", ")}</span>
            )}
            <span>• ★ {Number(movie.vote_average).toFixed(1)}</span>
          </div>

          <p className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm text-base leading-relaxed text-gray-800">
            {movie.overview || "개요 정보가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
