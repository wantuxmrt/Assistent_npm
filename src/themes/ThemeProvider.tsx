import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';
import { Theme, ThemeName } from './themeTypes';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('dark');

  // При монтировании проверить сохраненную тему или системные настройки
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    setThemeName(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }, []);

  // При изменении темы сохранить в localStorage
  useEffect(() => {
    localStorage.setItem('theme', themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    return themeName === 'light' ? lightTheme : darkTheme;
  }, [themeName]);

  const value = { theme, themeName, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${themeName}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};