import { useState } from "react";
import type { Movie } from "../types/movie.ts";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false); // hover되었는지 아닌지 상태
  console.log(isHovered);

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-300 hover:scale-105" // 모든 absolute는 이걸 따른다(css position 개념)
      onMouseEnter={(): void => setIsHovered(true)}
      onMouseLeave={(): void => setIsHovered(false)} // true: 마우스 올렸을 때, false: 마우스 떠났을 때
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`} 
        className=""
      />
      {isHovered && ( 
        <div className="absolute inset-0 bg-gradient-to-t from black/50 to-transparent backdrop-blur-md flex-col justify-center text-white p-4"> 
         {/* // 사진위에 글자올리는거 inset-0 */}
          <h2 className="text-lg font-bold text-center leading-snug">{movie.title}</h2>
          <p className='text-sm text-gray-300 leading-relaxied mt-2 line-clamp-5' >{movie.overview}</p>
        </div>
      )}
      {/*템플릿 문자열은 작은 따옴표가 아니라 백틱. w200 = width:200*/}
    </div>
  );
}
