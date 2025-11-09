import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

//  초기값을 null로 설정하고, ResponseMyInfoDto 또는 null 타입을 사용합니다.
const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  //  초기값은 null로 설정하고, Union Type을 사용합니다.
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: ResponseMyInfoDto = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // 1. 로딩 중일 때 처리
  if (isLoading) {
    return <div>내 정보 로딩 중...</div>;
  }

  // 2. 데이터가 없을 때 (요청 실패 등) 처리
  // data가 null이면 data.data?.name을 접근하는 것을 방지합니다.
  if (!data) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  // 3. 정상적으로 데이터가 있을 때 렌더링
  return (
    <div>
      {/* data가 존재하므로 이제 안전하게 접근합니다. */}
      <div>{data.data?.name}님 환영합니다.</div>
      {/*  data.data?.avatar 다음에 .as string 문법은 TypeScript 문법으로 JSX에서는 오류를 유발합니다. 
          따옴표 안에 변수를 넣거나, 변수 타입을 string으로 확신하는 경우에만 사용해야 합니다. 
          일단 .as string 부분을 제거하고 테스트합니다. */}
      <img src={(data.data?.avatar as string) || logo} alt={"구글로고"} />
      <h1>{data.data?.email}</h1>
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
