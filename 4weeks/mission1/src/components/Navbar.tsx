import { Link, NavLink, useParams } from "react-router-dom";

export const Navbar = () => {
  // const params = useParams<{category:string}>();

  // ⚠️ 배열로 바꿔서 map이 돌 수 있게만 최소 수정
  const LINKS = [
    {to: '/', label:'홈'},
    {to:'/movies/popular', label:'인기영화'},
    {to: '/movies/now_playing', label:'상영중'},
    {to: '/movies/top_rated', label:'평점 높은'},
    {to: '/movies/upcoming', label:'개봉예정'}, // ✅ 경로 수정
  ];

  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({to, label}) => (
        <NavLink
          key={to}
          to={to}
          // 타입 표기는 제거(컴파일 에러 원인) + 원래 로직 유지
          className={({isActive}) => { 
            return isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'; 
          }}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};


//    <Link to="/">홈</Link>
//       <Link to="/movies/popular">인기영화</Link>
//       <Link to="/movies/now_playing">상영 중</Link>
//       <Link to="/movies/now_playing">인기 영화</Link>
//       <Link to="/movies/now_playing">상영 중</Link>
