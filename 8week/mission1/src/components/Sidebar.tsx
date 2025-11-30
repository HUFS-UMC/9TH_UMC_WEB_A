import { useEffect } from "react";

interface SidebarProps {
    isOpen : boolean;
    onClose : () => void;
}

export const Sidebar = ({ isOpen, onClose } : SidebarProps) => {
    useEffect(() => {
        const handleEscape = (e:KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen, onClose]);
    return (
        <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm
            transition-opacity duration-300 z-40 ${isOpen ? "opacity-100" : 
            "opacity-0 pointer-events-none"}`}
            onClick={onClose}
        >
            <aside
              className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl
              trasform transition-transform duration-300 ease-in-out z-50 ${isOpen ?
              "transition-x-0" : "-transition-x-full"}`}
              role="dialog"
              >
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="tezxt-2xl font-bold text-gray-900">돌려돌려 LP판</h2>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-2">
                        <li>
                            <a 
                            href="#home" 
                            className="flex items-center px-4 py-3 text-gray-700
                            rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span></span>
                                <span className="ml-3 font-medium">찾기</span>
                            </a>
                        </li>
                            <a 
                            href="#mypage" 
                            className="flex items-center px-4 py-3 text-gray-700
                            rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span></span>
                                <span className="ml-3 font-medium">마이페이지</span>
                            </a>
                    </ul>
                    </nav>
                </div>
                

            </aside>

        </div>
    )
}

