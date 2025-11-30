interface HamburgerProps {
  onClick: () => void; // 햄버거 버튼 클릭 시 실행할 함수 (메뉴 열고 닫기)
  isOpen: boolean;     // 메뉴가 열렸는지 여부 → 아이콘 변형에 사용
}

export const HamburgerButton = ({ onClick, isOpen }: HamburgerProps) => {
  return (
    <button
      onClick={onClick} // 클릭 시 부모로부터 전달된 토글 함수 실행
      className="relative z-50 p-2 rounded-lg hover:bg-gray-700 transition-colors"
      // z-50: 다른 UI 요소 위에 위치
      // p-2: 클릭 영역 확보
      // hover:bg-gray-700: 호버 시 배경 강조
      // transition-colors: 색상 전환 부드럽게
    >
      {/* 햄버거 아이콘(3줄)을 세로 방향으로 정렬하는 컨테이너 */}
      <div className="w-6 h-5 flex flex-col justify-between">
        
        {/* 1번째 줄: 메뉴 열릴 때 → 대각선(↗)으로 변함 */}
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          } `}
          // rotate-45: 45도 회전하여 X의 윗 선이 됨
          // translate-y-2: 아래로 이동해 중앙에 맞춰짐
        />

        {/* 2번째 줄: 메뉴 열릴 때 중앙 라인을 숨김 → X 모양을 깔끔하게 보이게 함 */}
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          } `}
          // opacity-0: 완전히 숨김
        />

        {/* 3번째 줄: 메뉴 열릴 때 → 대각선(↙)으로 변함 */}
        <span
          className={`block h-0.5 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          } `}
          // -rotate-45: 반대 방향으로 45도 회전하여 X의 아래 선을 구성
          // -translate-y-2.5: 위쪽으로 이동해 정렬
        />
      </div>
    </button>
  );
};
