import { useState } from "react";

/**
 * useSidebar 훅
 * - 목적: 사이드바(또는 모달 등) 열림/닫힘 상태와 제어 함수를 재사용 가능한 형태로 제공합니다.
 * - 반환: { isOpen, toggle, open, close }
 *
 * */
export const useSidebar = () => {
  // isOpen: 사이드바가 열려있는지 여부 (true이면 열림)
  const [isOpen, setIsOpen] = useState(false);

  // toggle(): 현재 상태 반전. 햄버거 버튼 등에 연결해서 사용.
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // open(): 사이드바를 강제로 연다. (예: 특정 버튼 클릭)
  const open = () => {
    setIsOpen(true);
  };

  // close(): 사이드바를 강제로 닫는다. (예: 오버레이 클릭 또는 ESC 핸들러에서 호출)
  const close = () => {
    setIsOpen(false);
  };

  // 반환값 설명: 구조분해 할당으로 사용하기 쉽도록 객체 형태로 반환
  // 예: const { isOpen, open, close, toggle } = useSidebar();
  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
