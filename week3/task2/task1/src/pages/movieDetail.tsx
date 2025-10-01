import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  type { MovieDetail } from "../../../../copy_task3/9TH_UMC_WEB_A/task1/src/types/moviedetail";
import ActorCard from "../components/ActorCard";
import DirectorCard from "../components/DirectorCard";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isPending) return <div className="p-10 text-center">로딩 중...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">데이터를 불러오는 중 에러 발생</div>;
  if (!movie) return null;

  const director = movie.credits?.crew?.find(c => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 12) ?? [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 배경 + 제목 */}
      <div
        className="relative h-96 bg-cover bg-center rounded-xl shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-sm line-clamp-3">{movie.overview}</p>
          <div className="mt-2 text-sm">
            {movie.release_date.slice(0, 4)} • {movie.runtime}분 • ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 감독/출연진 */}
      <h2 className="mt-8 text-2xl font-bold">감독 / 출연진</h2>
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {director && <DirectorCard director={director} />}
        {cast.map(actor => <ActorCard key={actor.id} actor={actor} />)}
      </div>
    </div>
  );
};

export default MovieDetailPage;
