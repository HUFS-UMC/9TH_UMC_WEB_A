import clsx from "clsx";
import { useTheme, THEME } from "./context/ThemeProvider";

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        {" "}
        Themecontent
      </h1>
      <p
        className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}
      > 안녕~얘들아</p>
    </div>
  );
}
