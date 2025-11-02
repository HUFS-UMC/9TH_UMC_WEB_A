import { navigate } from "../router"; // 우리가 만든 navigate 함수를 불러옴. 버튼 클릭 시 이걸로 페이지 이동

export default function Nav() {
  return (
    <div style={{ padding: 12, background: "#eee", position: "sticky", top: 0 }}>
      {/* 이 버튼을 누르면 navigate("/nothing")이 실행돼서
          주소창이 /nothing으로 바뀌고, 결국 NotFound 페이지가 뜨게 된다 */}
      <button onClick={() => navigate("/nothing")}>
        NotFound로 가는길....
      </button>
    </div>
  );
}
