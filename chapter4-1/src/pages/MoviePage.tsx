import { useState, useMemo } from "react";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import type { AxiosRequestConfig } from "axios";

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // 1. useMemo로 options 객체를 안정화하여 무한 루프를 방지합니다.
  const fetchOptions: AxiosRequestConfig = useMemo(() => ({}), []);

  const { data, isPending, isError } = useCustomFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
    fetchOptions // 안정화된 객체 전달
  );

  // 로딩 상태 처리
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <span className="text-red-500 text-2xl font-bold">
          에러가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </span>
      </div>
    );
  }

  return (
    <>
      {/* 페이지네이션 UI */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span className="text-lg font-semibold">{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>

      {/* 영화 카드 목록 (JSX 문법 오류 해결) */}
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {/* data?.results의 map 함수는 소괄호 ()를 사용하여 JSX를 즉시 반환합니다. */}
        {data?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default MoviePage;
