import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie"; // 확장자 생략 가능
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
//1. TMDB 목록 API의 응답 형태를 타입으로 정의
type TMDBResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

//2.
export default function MoviePage() {
  // 영화정보를 어떻게 화면에 보이게 하냐
  const [movies, setMovies] = useState<Movie[]>([]);//영화 목록 상태. Movie[]로 제네릭을 줘서 오직 Movie 타입 배열만 들어가게 타입 안전성 확보.
  //1.로딩 상태:로딩 상태. API 호출 시작 전에 true, 끝나면 false.이걸로 스피너를 보일지/감출지 결정.
  const [isPending, setIsPending] = useState(false);

  //2. 에러 상태
  const [isError, setIsError] = useState(false);

  //3.페이지 네이션:현재 페이지 번호. 이전/다음 버튼이 이 값을 바꾸면, 아래 useEffect가 다시 실행되며 새 데이터를 받아온다.
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>(); //URL 파라미터 읽기. 라우트가 /movies/:category면 category에 popular, now_playing 같은 문자열이 들어온다.

  useEffect((): void => {
    // data를 불러 와보자
    const fetchMovies = async (): Promise<void> => { //fetchMovies:TMDB API에서 데이터를 불러오기 위한 용도
      setIsPending(true); //로딩 시작 상태로 바꾼다.이 코드가 실행되면 isPending이 true가 되고, 컴포넌트가 리렌더링된다.그 결과로 <LoadingSpinner /> 같은 로딩 UI가 나타나게 된다.
      try {
        const { data } = await axios.get<TMDBResponse>(  // axios.get으로 TMDB API에 GET 요청을 보냄.
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,//${category} → 예: "popular", "top_rated", "now_playing". ${page} → 현재 페이지 번호.
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, //Authorization: Bearer 토큰 방식. TMDB API는 개인 발급 토큰이 있어야 함.-> .env파일에서 작업함
              accept: "application/json",//accept: "application/json": 서버에게 JSON 형식으로 응답 달라고 명시. ->fetcy랑 axios의 차이
            },
          }
        );

        setMovies(data.results ?? []);
      } catch { //네트워크 오류, 인증 오류, 4xx/5xx 등 실패 시 에러 상태를 true로.
        setIsError(true);
      } finally {//성공/실패 상관없이 항상 실행 → 로딩 상태를 끔. -> 스피너 돌아가는거 확실히 닫으려고 
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

// try catch문 쓴이유
//정리성공하면 movies 업데이트 → 화면에 새 영화 목록 표시.
//실패하면 catch 블록에서 setIsError(true) 호출 → 에러 UI 표시할 수 있음.
//try catch설명 ->axios.get(...) 같은 네트워크 요청은 항상 실패할 가능성이 있어.
//try {
  // 시도할 코드 (에러 날 수도 있음)
//} catch (error) {
  // 에러가 났을 때 실행되는 코드
//}


//3.
  return (
    <>
    {/*페이지 네이션을 담는곳*/}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed" // ✅ bh → bg
          disabled={page === 1} // page가 1일때는 <이 버튼이 동작하지 않게:0페이지는 없으니깐
          onClick={(): void => setPage((prev): number => prev - 1)} //onClick: 클릭 시 page 상태를 현재 값 - 1로 변경.
        >{`<`}</button>
        <span>{page}페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={(): void => setPage((prev): number => prev + 1)} //onClick: 클릭 시 page 상태를 현재 값 + 1로 변경.
        >
          {">"}
        </button>
      </div>

//

      {isPending && ( //isPending이 true일 때만 실행됨. (즉, API 요청이 진행 중일 때)
        <div className="flex items-center justify-center h-screen h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && ( //isPending이 false일 때만 실행됨. (즉, 로딩이 끝났을 때) -> 정상적 화면 왜 영화 카드 주루룩 있는 화면
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie: Movie) => (//movies.map(...)}: movies 배열을 돌면서 <MovieCard /> 컴포넌트를 여러 개 렌더-> map은 반복되는 것들을 반복안하려고 쓰느거다.
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
// isPending === true일 때 → 로딩 스피너
// isPending === false일 때 → 영화 리스트
// 조건이 true → 실행할코드 반환

// 조건이 false → 그냥 false 반환 (아무것도 안 렌더됨)



// 조건 && 실행할코드


// 삼항 연산자로도 쓸수 있다.
// {isPending ? (
//   <div className="flex items-center justify-center h-dvh">
//     <LoadingSpinner />
//   </div>
// ) : (
//   <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
//     {movies.map((movie: Movie) => (
//       <MovieCard key={movie.id} movie={movie} />
//     ))}
//   </div>
// )}
