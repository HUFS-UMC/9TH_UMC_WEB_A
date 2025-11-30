import { useEffect, useRef } from "react";

interface SidebarProps {
  // isOpen: 사이드바의 열림 상태 (true면 열림)
  isOpen: boolean;
  // onClose: 사이드바를 닫는 콜백 (부모에서 상태를 변경)
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  // ================================================================
  // ESC 키로 사이드바 닫기 (접근성 및 사용성)
  // ================================================================
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // e.key는 사용성/가독성 측면에서 간단한 비교. (예: 'Esc' vs 'Escape' 브라우저 차이 주의 — 대부분 Modern 브라우저는 'Escape')
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // ================================================================
  // 배경 스크롤 방지(사용성)
  // ================================================================
  useEffect(() => {
    if (isOpen) {
      // 열림: 스크롤 잠금
      document.body.style.overflow = "hidden";
    } else {
      // 닫힘: 원래대로
      document.body.style.overflow = "unset";
    }

    // cleanup: 컴포넌트 언마운트 시에도 반드시 원복
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ================================================================
  // 접근성: 초기 포커스 이동 및 포커스 복원
  // ================================================================
  const asideRef = useRef<HTMLElement | null>(null);
  const prevActiveElementRef = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 현재 포커스(닫기 전)를 저장
      prevActiveElementRef.current = document.activeElement;
      // programmatic focus 허용을 위해 tabIndex=-1 필요(아래 JSX에서 설정)
      asideRef.current?.focus();
    } else {
      // 닫힐 때 이전 포커스를 복원
      const prev = prevActiveElementRef.current as HTMLElement | null;
      prev?.focus?.();
      prevActiveElementRef.current = null;
    }
  }, [isOpen]);

  // ================================================================
  // 애니메이션(Transition) 구현 및 접근성 고려
  // - 오버레이: opacity 전환 (fade) -> Tailwind: transition-opacity duration-300 등
  // - 패널: transform(translate-x) 전환 (slide in/out) -> Tailwind: transform transition-transform duration-300 ease-in-out
  // - pointer-events-none: 닫힌 상태에서 오버레이가 클릭을 받지 않도록 하여 UX 문제 방지
  // - z-index: 오버레이(z-40)보다 패널(z-50)가 위에 있도록 설정
  // - 접근성(감각 민감 사용자) 고려:
  //   - prefers-reduced-motion 미디어 쿼리를 확인하여 애니메이션을 줄이거나 제거하는 처리가 권장됨.
  //     예: @media (prefers-reduced-motion: reduce) { .transition-* { transition: none; } }
  //   - 애니메이션이 콘텐츠의 의미 전달을 방해하지 않도록 테스트 필요.
  // ================================================================
  return (
    // 오버레이(배경 반투명 레이어)
    // - aria-hidden: 보조기술에 시각적으로 숨김/노출 상태를 전달 (true면 보조기술이 무시)
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      {/* 
        사이드바(패널)
        - role="dialog" 및 aria-modal="true"로 보조기술에 다이얼로그임을 알림
        - aria-labelledby로 제목 연결 (id=sidebar-title)
        - tabIndex={-1} + ref로 프로그램적 포커스 이동 가능
        - onClick stopPropagation: 사이드바 내부 클릭이 오버레이에 전파되어 닫히는 것을 방지
      */}
      <aside
        ref={asideRef}
        tabIndex={-1}
        className={`fixed top-0 left-0 h-full w-80 dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
        aria-hidden={!isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          { /* 헤더: 닫기 버튼이 왼쪽에 들어올 경우를 대비해 flex로 정렬하고, 제목에 왼쪽 여백을 주어 겹치지 않도록 함 */ }
          <div className="p-6 border-b border-gray-200 flex items-center">
            {/* 제목에 id를 달아 aria-labelledby가 가리키도록 함 */}
            <h2 id="sidebar-title" className="text-2xl font-bold text-[#e61c9c] ml-12">돌려돌려 LP판</h2>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#search"
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>🔍</span>
                  <span className="ml-3 font-medium">찾기</span>
                </a>
              </li>

              <li>
                <a
                  href="#mypage"
                  className="flex items-center px-4 py-3 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>👤</span>
                  <span className="ml-3 font-medium">마이페이지</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

