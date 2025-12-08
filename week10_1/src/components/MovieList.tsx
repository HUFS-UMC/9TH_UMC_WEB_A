import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
  <div
    className="
      grid 
      grid-cols-2          /* 모바일 (기본) 2열 */
      sm:grid-cols-3       /* 작은 태블릿 3열 */
      md:grid-cols-4       /* 태블릿/작은 데스크탑 4열 */
      lg:grid-cols-5       /* 큰 데스크탑 5열 */
      gap-6
    "
  >
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
);

};

export default MovieList;
