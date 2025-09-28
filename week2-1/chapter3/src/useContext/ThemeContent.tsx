import clsx from "clsx";
import { useTheme, THEME } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "w-full p-4 h-screen",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme content
      </h1>
      <p
        className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
}