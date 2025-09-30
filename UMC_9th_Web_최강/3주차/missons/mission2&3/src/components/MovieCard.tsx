import { useState } from "react"
import type { Movie } from "../types/movie"
import { useNavigate } from "react-router-dom"
interface MovieCardProps {
    movie: Movie
    category: string
}
export default function MovieCard({ movie, category }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false) 
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(`/movies/${category}/${movie.id}`, {state: movie})} 
            // navigate는 라우팅을 담당해줌(페이지 이동) 페이지 이동시 popular 부분도 변경되게 하고 싶음 => props를 내려받기를 통해서 해결
            // 그리고 navigate의 두번째 인자가 중요한 역할을 하는데 현재 주소창에서의 객체를 보낼 수 있다 이를 통해서 상세 정보를 새로 받지않고
            //기존에 영화에 대해서 받아온 정보만으로 상세 페이지를 구축할 수 있음
            className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer
            w-44 transition-transform duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title}의 포스터`}
            className=""
            />
            {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md 
            text-white flex flex-col justify-center items-center p-4">
                <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
                <p className="text-sm">{movie.overview}</p>
            </div>
            )}
        </div>
    )
}

//영화 포스터를 출력하는 부분을 정의