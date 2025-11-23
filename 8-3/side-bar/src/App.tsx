import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { HamburgerButton } from "./components/HamburgerButton";
import { useSidebar } from "./hooks/useSidebar";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  const { isOpen, toggle, close } = useSidebar();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="fixed top-0 left-0 bg-white shadow-sm z-50 w-full">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center  h-16 gap-4">
            <HamburgerButton isOpen={isOpen} onClick={toggle} />
            <h1 className="text-xl font-bold text-gray-900">돌려돌려 lp판 </h1>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOpen} onClose={close} />
    </div>
  );
}
