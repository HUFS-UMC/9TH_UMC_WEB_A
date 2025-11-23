import { useState } from "react";

export const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // setIsOpen -> true: open / false:close
  // isOpen==True:open /close하는 토글
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};
