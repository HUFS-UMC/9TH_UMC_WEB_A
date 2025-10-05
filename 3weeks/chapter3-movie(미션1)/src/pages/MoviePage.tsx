import { useEffect, useState } from "react";
import axios from "axios"; // ✅ axios import
import type { Movie } from "../types/movie"; // 확장자 생략 가능
import MovieCard from "../components/MovieCard";

type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default function MoviePage() {
  // 영화정보를 어떻게 화면에 보이게 하냐
  const [movies, setMovies] = useState<Movie[]>([]); // 배열이긴하지만 제니릭으로 무비만 들어갈수 있는 배열임을 선언함
  //1.로딩 상태
  //const [is ]
  //2. 에러 상태

  useEffect((): void => {
    // data를 불러 와보겠습니다.
    const fetchMovies = async (): Promise<void> => {
      // const response = await fetch( ❌ → axios 사용
      const { data } = await axios.get<TMDBResponse>(
        // 영상에서는 fetch 가 아니라 axios다.
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", // page-2면 2번 패이지에 대한정보/ en-US>ko-KR로 바꾸면 한국어데 맞춰서
        {
          headers: {
            // credential을 안 넣었는데 호출이 될수도 있는데 나는 그게 아니니깐 이렇게 적어준다.
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, // v4 Access Token 사용
            accept: "application/json", // 기본적으로 세팅 되어있어서 굳이 안나오도 되는데 나중에 이미지 처리 해야 할때는 넣어야 할수 있다.
          },
        }
        // 지금 .env에 저장해둔 값은 v4의 긴토큰인데 v4토큰은 url로 붙이는 걸 허용하지 않고 대신 요청을 보낼때
        // Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` 이런식으로 http헤더 안에 넣어야한다.
      );

      // const result: TMDBResponse = await response.json(); ❌ 필요 없음
      console.log(data); // 결과 구조 확인용
      setMovies(data.results ?? []); // ✅ 여기서 상태에 넣어야 화면에 보임!
    };

    fetchMovies();
  }, []); // 한번만 실행하고 싶어서 useEffect 사용

  // MoviePage.tsx:32 Uncaught TypeError 방지를 위해 옵셔널을 썼다면,
  // 상태 업데이트 전에 접근하지 않도록 아래처럼 렌더에서만 안전하게 사용하자.

  return (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

//axios 요청에 대해 성공했을 떄 이루어지는 타입에 대해 정의해주는개 좋다.
//fetch는 response.json()을 한 번 더 호출해야 하고,

//axios는 응답이 data 안에 바로 들어오기 때문에 const { data } = await axios.get<>() 이렇게 쓰면 됩니다.
