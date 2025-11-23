import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
//import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return <div>내 정보 로딩 중...</div>;
  }

  if (!data) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  //정상적으로 데이터가 있을 때 렌더링
  return (
    <div>
      {/* data가 존재하므로 이제 안전하게 접근합니다. */}
      <div>{data.data?.name}님 환영합니다.</div>
      <img src={(data.data?.avatar as string) || "logo"} alt={"google"} />
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