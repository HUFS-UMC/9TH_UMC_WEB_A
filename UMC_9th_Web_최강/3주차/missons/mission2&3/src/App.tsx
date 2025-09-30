import './App.css'
import MoviePage from './pages/MoviePage'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import MovieDetail from './pages/MovieDetail'

const router = createBrowserRouter([ // 페이지 전환을 라우터로 정의
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFound/>,
    children: [{
      path: 'movies/:category',
      element: <MoviePage/>, // 페이지 주소가 달라져도 하는 역할은 이것임
      index: true
    },
    {
      path: 'movies/:category/:movieId', //각 페이지 별로 영화를 선택했을 때 상세 정보로 이동
      element: <MovieDetail/>
    }]
  }
])

function App() {

  return <RouterProvider router={router} />
  
}

export default App
