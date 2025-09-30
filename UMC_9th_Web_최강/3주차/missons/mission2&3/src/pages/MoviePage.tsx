import { useEffect, useState } from "react"
import axios from 'axios'
import type{Movie, MovieResponse}  from "../types/movie"
import MovieCard from "../components/MovieCard"
import LoadingSpinner from "../components/LoadingSpinner"
import { useParams } from "react-router-dom"
export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([])//영화 정보 받아오기
    const [page, setPage] = useState(1) //몇 페이지인지
    
    const [isPending, setIsPending] = useState(false)//로딩 상태
    const [error, setError] = useState(false)//에러 상태

    const {category} = useParams<{category: string}>()//동적 라우팅 주소 받아오기

    //유즈 이펙트 사용해서 영화 정보 변하거나 페이지 변하면 정보 받아오기
    useEffect(() => {
    const fetchMovies = async () => {
        try{
            setIsPending(true)
            const {data} = await axios<MovieResponse>(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                    }
                }
                )
            setMovies(data.results)
            }
        catch {
            setError(true)
        }
        finally { //try catch에서 항상 공통으로 적용되는 부분
            setIsPending(false)
        }

    }
    fetchMovies()
    }, ([page, category])
    )
    if(error) {
        return (
        <div>
            <span className="text-red-500">에러가 발생했습니다.</span>
        </div>
        )
    }
    // 리턴으로 nav 제공(페이지를 전환하는 부분)과 함께 로딩 상태면 로팅 상태 표현 마지막으로 로딩 끝나면 영화 포스터들 map으로 화면에 반환
    return (
        <>
        <div className="flex justify-center items-center gap-6 mt-4">
            <button 
            className="bg-[#c77ecf] text-white px-6 py-3 rounded-lg shadow-md
            hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
            cursor-pointer disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => {setPage((prev) => prev - 1)}}
            >{`<`}</button>

            <span>{page}번 째 페이지</span>

            <button 
            className="bg-[#c77ecf] text-white px-6 py-3 rounded-lg shadow-md 
            hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
             onClick={() => {setPage((prev) => prev + 1)}}
             >{`>`}</button>
        </div>
        {isPending && (
            <div className="flex justify-center items-center h-dvh">
                <LoadingSpinner />
            </div>
        )} 
        {!isPending && (
            <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} category={category}/>
        ))}
        </div>
        )}
        </>

    )
}