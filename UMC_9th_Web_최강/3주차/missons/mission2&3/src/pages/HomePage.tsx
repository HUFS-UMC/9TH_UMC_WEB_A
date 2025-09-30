import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
// 홈페이지를 정의함 내비바 아래에 홈페이지 주소 다음에 오는 자식을들 출력하라는 outlet적용