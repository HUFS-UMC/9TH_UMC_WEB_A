import { useTheme, THEME } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "px-4 py-2 rounded-md border transition-colors duration-200",
        isLightMode
          ? "border-gray-400 text-gray-800 hover:bg-gray-100"
          : "border-gray-600 text-white hover:bg-gray-800"
      )}
    >
      {isLightMode ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
}
