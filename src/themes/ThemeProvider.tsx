import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';
import { Theme, ThemeName } from './themeTypes';

// Функция для адаптации темы к требованиям styled-components
const adaptTheme = (theme: Theme) => ({
  ...theme,
  background: theme.colors.bgColor,
  text: theme.colors.text,
  primary: theme.colors.primary,
  secondary: theme.colors.secondary,
  error: theme.colors.error,
  success: theme.colors.success,
  accent: theme.colors.accent,
  warning: theme.colors.warning,
});

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setThemeName(initialTheme);
    document.body.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeName);
    document.body.setAttribute('data-theme', themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    return themeName === 'light' ? lightTheme : darkTheme;
  }, [themeName]);

  // Создаем адаптированную версию темы
  const adaptedTheme = useMemo(() => adaptTheme(theme), [theme]);

  const value = { theme, themeName, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={adaptedTheme}>
        {children}
      </StyledThemeProvider>
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