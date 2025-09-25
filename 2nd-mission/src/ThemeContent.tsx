import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";



export default function ThemeCountent() {
  const {theme, toggelTheme} = useTheme()
  const isLight = theme === THEME.LIGHT;
  return (
    <div className={clsx(
      'p-4 h-dvh w-full',
      !isLight ? 'bg-black' : 'bg-white'
  )}>
    <h1 className={clsx(
      'twxt-wxl font-bold',
      isLight ? 'text-black' : 'text-white'
    )}>최강/손성원</h1>
      
    </div>
  )
}
