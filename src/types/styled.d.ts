import 'styled-components';
import { Theme } from '../themes/themeTypes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    error: string;
    success: string;
    accent: string;
    warning: string;
  }
}