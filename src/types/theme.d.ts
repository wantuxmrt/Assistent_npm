import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      error: string;
      success: string;
      // Добавьте другие цвета по необходимости
    };
    fonts: {
      main: string;
      headers: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    // Добавьте другие свойства темы
  }
}

export interface Theme {
  name: 'light' | 'dark';
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    bgCard: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    bubbleUser: string;
    bubbleBot: string;
    edit: string;
    divider: string;
    critical: string;
    high: string;
    medium: string;
    low: string;
    tableHeader: string;
    tableRow: string;
    manager: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}