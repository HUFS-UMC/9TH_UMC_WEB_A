import { useState } from "react";
import type { Movie } from '../types/movie';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie } : MovieCardProps){
    const [isHovered, setIsHovered] = useState<boolean>(false);
    console.log(movie.poster_path);


    return (
        <div 
        className='relative'
        onMouseEnter={() : void => setIsHovered(true)}
        onMouseLeave={() : void => setIsHovered(false)}
        >
        <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} 영화의 이미지`}
                className=''
        />

        {isHovered && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/50
            to-transparent backdrop-blur-md flex flex-col justify-center
            items-center text-white'>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
        </div>
    )}
    </div>
    );
}