import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  useEffect(() => {
    // 컴포넌트 마운트 시 내 정보 조회 (디버그 목적: 콘솔 출력)
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };
    getData();
  }, []);

  return <div>Mypage</div>;
};

export default MyPage;
