export interface Theme {
  name: string;
  colors: {
    bgColor: string;
    panelBg: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    success: string;
    warning: string;
    error: string;
    bubbleUser: string;
    bubbleBot: string;
    editColor: string;
    searchBg: string;
    cardBg: string;
    filterBg: string;
    divider: string;
    critical: string;
    high: string;
    medium: string;
    low: string;
    tableHeader: string;
    tableRow: string;
    managerColor: string;
  };
  gradients: {
    userAvatar: string;
    logo: string;
  };
  shadows: {
    header: string;
    card: string;
    button: string;
  };
  breakpoints: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  fonts: {
    main: string;
    header: string;
  };
}

export type ThemeName = 'light' | 'dark';