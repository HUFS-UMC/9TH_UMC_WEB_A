import { navigate } from "../router";

export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1>다른 페이지로 가세요</h1>
      <button onClick={() => navigate("/")}>집으로가자</button> ///는 “도메인 바로 아래 최상위 경로”를 뜻함. 그래서 아무 경로도 붙이지 않은 기본 주소 = 홈.
    </div>
  );
}
