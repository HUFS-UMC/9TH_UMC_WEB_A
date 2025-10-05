// Navbar.tsx
import clsx from "clsx";
import { useTheme, THEME } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "w-full h-20 px-6 flex items-center justify-end transition-colors duration-300",
        isLightMode ? "bg-white text-gray-800" : "bg-gray-800 text-white"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
