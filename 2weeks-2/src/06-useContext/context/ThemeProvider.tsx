import { createContext, type PropsWithChildren, useContext, useState } from "react";

// enum 대신 문자열 유니온 + 값 객체
export type Theme = 'LIGHT' | 'DARK';
export const THEME = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const;

type TTheme = Theme;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme(prev => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = ():IThemeContext =>{
  const context =useContext(ThemeContext);

  if(!context){
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};