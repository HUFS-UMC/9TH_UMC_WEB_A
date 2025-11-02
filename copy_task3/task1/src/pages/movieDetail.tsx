import { useParams } from "react-router-dom";
import type { MovieDetail } from "../types/moviedetail";
import ActorCard from "../components/ActorCard";
import DirectorCard from "../components/DirectorCard";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movie, isLoading, error, refetch } = useCustomFetch<MovieDetail>(
    {
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      method: "GET",
      params: { language: "en-US", append_to_response: "credits" },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    },
    [movieId] // 의존성 변경 시 자동 재요청
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Skeleton 헤더 */}
        <div className="h-96 rounded-xl bg-gray-200 animate-pulse" />
        {/* Skeleton 섹션 타이틀 */}
        <div className="mt-8 h-7 w-40 bg-gray-200 rounded animate-pulse" />
        {/* Skeleton 카드 그리드 */}
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 max-w-2xl mx-auto text-center">
        <div className="text-red-500 font-semibold">데이터를 불러오는 중 에러가 발생했어요.</div>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!movie) return null;

  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 12) ?? [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Hero 섹션 */}
      <div
        className="relative h-104 bg-cover bg-center rounded-2xl shadow-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-sm">{movie.title}</h1>
          <p className="mt-2 text-sm md:text-base line-clamp-3 opacity-90">{movie.overview}</p>
          <div className="mt-3 text-sm md:text-base flex flex-wrap items-center gap-2 opacity-90">
            <span className="px-2 py-0.5 bg-white/20 rounded-full">
              {movie.release_date?.slice(0, 4) ?? "—"}
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full">{movie.runtime}분</span>
            <span>•</span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full">⭐ {movie.vote_average.toFixed(1)}</span>
            {movie.genres?.length ? (
              <>
                <span>•</span>
                <span className="truncate">
                  {movie.genres.map((g) => g.name).join(", ")}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>


      {/* 감독/출연진 */}
      <h2 className="mt-10 text-2xl font-bold">감독 / 출연진</h2>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {director && <DirectorCard director={director} />}
        {cast.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;

function InfoPill({ label, value }: { label: string; value?: string | number }) {
  if (!value && value !== 0) return null;
  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
