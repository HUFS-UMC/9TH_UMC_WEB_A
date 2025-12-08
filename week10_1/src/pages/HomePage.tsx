import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import { useCallback, useMemo, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}

// 검색 필터
// 영화 무비
