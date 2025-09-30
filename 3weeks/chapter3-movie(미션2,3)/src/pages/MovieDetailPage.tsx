import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


//1.Tmdb에서 콘솔창에서 정보 가져옴
type Genre = { id: number; name: string };
type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: Genre[];
};


//2. 
export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>(); 
  // 경로를 변수처럼 받는 방식,"movie/:movieId" 라면 URL /movie/12345에서 movieId라는 이름으로 "12345"를 꺼낼 수 있어.
  //왜 쓰나? 이 상세 페이지는 “어떤 영화인지”를 보여주는곳. 그 **식별자(movieId)**를 읽어 TMDB에 해당 영화 상세를 요청해야 하니까 useParams가 필요해.
  const navigate = useNavigate(); //👉 페이지를 코드로 이동시킬 때 쓰는 함수 가져오기. navigate(-1) → 뒤로가기 navigate("/movies") → 특정 페이지로 이동
  //navigate(-1)에서 말하는 뒤로가기는 브라우저의 히스토리 스택에서 바로 직전 페이지를 의미함->페이지네이션의 페이지 이동X

  const [movie, setMovie] = useState<MovieDetail | null>(null); //영화 상세 데이터를 담아둘 상태. 처음엔 null (아직 없음) API 성공 시 setMovie(데이터)
  const [isPending, setIsPending] = useState(false); //로딩 중인지 표시하는 상태. API 요청 시작 시 true 끝나면 false → 스피너 끄기
  const [isError, setIsError] = useState(false);//에러 났는지 표시하는 상태. 실패하면 true → 에러 메시지 띄움

  useEffect(() => { //UseEffect블록 :영화 상세 데이터 가져오기
    if (!movieId) return; // 언제 가져오냐? movieid가 바뀔떄마다

    const fetchMovieDetail = async (): Promise<void> => {
      setIsPending(true); //지금부터 API 요청 시작함 →스피너가 돌아감
      setIsError(false);//요청이 끝날 때 setIsPending(false) 하면 스피너가 사라짐.

      try {
        const { data } = await axios.get<MovieDetail>( 
          //1) axios로 GET 요청 보내기→ https://api.themoviedb.org/3/movie/${movieId}?... 주소로 영화 상세정보를 요청함. 2)응답에서 data만 꺼내기3) MovieDetail 형태로 작성한다. 
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, //movieId = useParams으로 가져온 값.
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`, //Authorization: TMDB API v4 인증 방식은 Bearer 토큰 필요..env 파일에 넣어둔 개인 토큰을 불러와서 붙이는 거야.
              accept: "application/json",//응답은 json형식으로 달라
            },
          }
        );
        setMovie(data ?? null);
      } catch {
        setIsError(true); //에러상태 / 착각하지 말자:스피너(로딩 표시)가도는 건 isError 때문이 아니라 isPending 때문
      } finally {
        setIsPending(false); //스피너 off
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  const img = (p?: string | null) =>
    p ? `https://image.tmdb.org/t/p/w500${p}` : ""; // 삼항연산자 : p 값이 있으면 true(url), 아니면 빈문자열 /p는 ㅇ포스터 이미지경로를 받아오는 매개변수




  // 로딩 / 에러 화면
  if (isPending) {
    return <div className="h-dvh grid place-items-center">로딩중</div>;
  }
  //영화 정보를 정상적으로 못 가져왔을 때 -> isError === true (요청 실패)거나, movie 데이터가 아직 없을 때
  if (isError || !movie) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)} //브라우저 히스토리 한 칸 뒤로 이동 (패이지 네이션 x) ->SPA에서, 브라우저 히스토리 한 칸 뒤로 가되 새로고침 없이 라우터만 바꿔라 (리액트가 SPA라서 "새로고침 없이" 이전 화면으로 가게 하려고 쓰는것.)
          className="px-3 py-2 rounded bg-gray-800 text-white"
        >
          뒤로
        </button>
        <p className="mt-4 text-red-500">영화 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }





  // 상세화면
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/*뒤로가기 버튼//브라우저 히스토리 한 칸 뒤로 이동 (패이지 네이션 x) ->SPA에서, 브라우저 히스토리 한 칸 뒤로 가되 새로고침 없이 라우터만 바꿔라 (리액트가 SPA라서 "새로고침 없이" 이전 화면으로 가게 하려고 쓰는것.)*/ }
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-2 rounded bg-gray-800 text-white"
      >
        뒤로
      </button>
  {/*포스터 영역*/}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 flex justify-center">
          {movie.poster_path ? ( // 삼항연산자
            <img
              src={img(movie.poster_path)}
              alt={`${movie.title} 포스터`}
              className="block mx-auto rounded-xl shadow-lg w-64"
            />
          ) : (
            <div className="w-64 aspect-[2/3] rounded-xl bg-gray-200 grid place-items-center">
              이미지 없음
            </div>
          )}
        </div>

        {/* 텍스트 정보 영역*/}
        <div className="md:col-span-3">
           {/*영화제목*/}
          <h1 className="mt-6 mb-4 text-7xl text-center font-bold">
            &lt;{movie.title}&gt;
          </h1>

           {/*메타정보*/}
          <div className="mt-2 text-sm text-gray-600 flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span>개봉: {movie.release_date || "미상"}</span>
            {movie.runtime ? <span>• {movie.runtime}분</span> : null} 
            {movie.genres?.length ? ( {/*옵셔널 체이닝 ? :객체가 null이나 undefined일 경우 에러를 내지 않고 그냥 undefined 반환.-> 여기서 쓴이유?movie 객체 안에 genres 배열이 없을 수도 있기 때문.*/}
              <span>• {movie.genres.map((g: Genre) => g.name).join(", ")}</span> {/*map((g) => g.name).join(", "): 장르 이름만 뽑아 쉼표로 연결 → 액션, 드라마 형태.*/}
            ) : null}
            <span>• ★ {movie.vote_average?.toFixed(1)}</span>
          </div>
//



           {/*overview*/}
          <p className="mt-6 p-4 bg-gray-50 rounded-lg shadow-sm text-base leading-relaxed text-gray-800">
            {movie.overview || "개요 정보가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}
