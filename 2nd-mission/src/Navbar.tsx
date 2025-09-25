import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider"
import ThemeToggleButton from "./themeToggleButton"

export default function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const isLight = theme === THEME.LIGHT;

    console.log(theme)
  return (
    <nav 
    className={clsx(
        'p-4 w-full flex justify-end',
        isLight ? 'bg-white' : 'bg-black'
    )}>
      <ThemeToggleButton />
    </nav>
  )
}
