import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-[100dvh]",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      ThemeContent
    </div>
  );
}
