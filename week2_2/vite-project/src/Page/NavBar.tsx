import {THEME, useTheme} from '../context/ThemeProvider';
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from 'clsx';

export default function NavBar() : Element {
    const {theme} = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx('w-full p-4 flex justify-end', 
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <ThemeToggleButton />
        </nav>
    )
}