import { THEME, useTheme } from "./context/ThemeProvider"
import clsx from 'clsx'
export default function themeToggleButton() {
    const {theme, toggleTheme} = useTheme();
    const isLight = theme === THEME.LIGHT;
  return (
    <button 
    onClick={toggleTheme}
    className={clsx('px-4 py-2 mt-2 rounded-md transition-all', {
      'bg-black text-white' : !isLight,
      'bg-white text-black' : isLight
    })}
    >
      {isLight ? '다크모드' : '라이트모드'}
    </button>
  )
}
