import "./App.css";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";

//1.라우터 설정 부분
const router = createBrowserRouter([
  { path: "/movie/:movieId", element: <MovieDetailPage /> }, 
  // path를 절댕경로로 나타냈는데 여기서movieId가 영화에 따라 계속 바뀌는거다. path가 매칭되면 moviedetailpage에 있는 moviedetailpage컴포넌트를 매칭해준다.


//1-1.홈라우트


  {
    path: "/", 
    element: <HomePage />,//paht(/)경로와 메칭되면 homepage컴포넌트가 화면에 표시된다.
    errorElement: <NotFoundPage />, // 만약에 위에 게 안되면 만약 이 라우트(즉, /와 그 자식들)를 탐색하는 과정에서 오류가 발생하거나 매칭이 안 되면 → NotFoundPage를 보여줌.
 // 중요) <HomePage/> 컴포넌트 안에 <Outlet />을 두면, 아래 children에 정의된 하위 라우트들이 거기에 끼워 넣어집니다.
 //->그래서 내가 homepage.tsx 컴포넌트로 가보면 outlet이 정의 되어있다.




    children: [
      //  영화 목록 라우트:movies/popular, /movies/now_playing 
      { path: "movies/:category", element: <MoviePage /> }, 
      //URL로는 /movies/popular, /movies/now_playing 등으로 매칭됩니다.
// 이때 MoviePage가 렌더링되고, :category 파라미터 값은 "popular", "now_playing" 같은 문자열이 됩니다.
//App.tsx의 children 정의 → HomePage.tsx의 <Outlet /> 위치에 바꿔끼워지면서 보여지는 구조예요.
    ],
  },

 
]); 


//2.지금 코드에서 RouterProvider를 넣어서,
//URL(주소)에 따라 HomePage, MoviePage, MovieDetailPage 같은 페이지 컴포넌트들을 교체해주는 역할을 함.
export default function App() {
  return <RouterProvider router={router} />;
}
