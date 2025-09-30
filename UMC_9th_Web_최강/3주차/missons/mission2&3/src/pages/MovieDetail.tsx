import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import type { MovieDetails, Credits } from "../types/movie"
import LoadingSpinner from "../components/LoadingSpinner"

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>()
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [credits, setCredits] = useState<Credits | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!movieId) return

    const fetchData = async () => {
      try {
        setIsPending(true)
        setError(false)

        // 영화 상세 정보
        const movieRes = await axios.get<MovieDetails>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        )
        setMovie(movieRes.data)

        // 크레딧 정보 (출연진/제작진)
        const creditsRes = await axios.get<Credits>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        )
        setCredits(creditsRes.data)
      } catch (e) {
        setError(true)
      } finally {
        setIsPending(false)
      }
    }

    fetchData()
  }, [movieId])

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="text-red-500 text-center mt-10">
        영화 정보를 불러올 수 없습니다.
      </div>
    )
  }

  // 감독만 crew에서 추출
  const directors = credits?.crew.filter((c) => c.job === "Director") || []
  const mainCast = credits?.cast.slice(0, 5) || [] // 출연진 5명만

  return (
    <div className="flex flex-col items-center p-6">
      {/* 제목 */}
      <h1 className="text-4xl font-extrabold text-center mb-6">{movie.title}</h1>

      {/* 포스터 */}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={`${movie.title}의 포스터`}
        className="rounded-lg shadow-lg mb-6"
      />

      {/* 평점 & 줄거리 */}
      <div className="max-w-2xl text-left mb-6">
        <p className="text-lg font-semibold mb-2">⭐ 평점: {movie.vote_average}</p>
        <p className="text-base leading-relaxed">{movie.overview}</p>
      </div>

      {/* 감독 */}
      {directors.length > 0 && (
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold mb-2">🎬 감독</h2>
          <ul className="list-disc list-inside">
            {directors.map((d) => (
              <li key={d.id}>{d.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 주요 출연진 */}
      {mainCast.length > 0 && (
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold mb-2">👥 출연진</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {mainCast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-full h-auto rounded-md mb-2"
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-600">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}