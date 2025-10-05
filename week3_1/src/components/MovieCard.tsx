import { useState } from "react"
import type { Movie } from "../types/movie"
interface MovieCardProps {
    movie: Movie
}
export default function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false) 

    return (
        <div
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
