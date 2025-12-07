import useFetch from "../hooks/useFetch";
import MovieList from "../components/MovieList";
import type { MovieResponse, MovieFilters } from "../types/movie";
import MovieFilter from "../components/MovieFilter";
import { useCallback, useMemo, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    languauge: "ko-KR",
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
    <div className="container">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩중입니다.</div>
      ) : error ? (
        <div>에러가 발생했습니다.</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}
