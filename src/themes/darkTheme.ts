import { Theme } from './themeTypes';

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bgColor: '#0f1b2d',
    panelBg: '#1a2b40',
    primary: '#4a8cff',
    secondary: '#6b4dff',
    accent: '#ff6b8b',
    text: '#e6f1ff',
    success: '#4ade80',
    warning: '#facc15',
    error: '#ff6b6b',
    bubbleUser: '#2a4365',
    bubbleBot: '#1e3a5f',
    editColor: '#facc15',
    searchBg: 'rgba(30, 58, 95, 0.7)',
    cardBg: 'rgba(30, 58, 95, 0.5)',
    filterBg: 'rgba(23, 43, 69, 0.8)',
    divider: 'rgba(74, 140, 255, 0.2)',
    critical: '#ff6b6b',
    high: '#ff9e6b',
    medium: '#facc15',
    low: '#4ade80',
    tableHeader: '#1a2e4a',
    tableRow: 'rgba(30, 58, 95, 0.3)',
    managerColor: '#9b5de5',
  },
  gradients: {
    userAvatar: 'linear-gradient(135deg, #4a8cff, #6b4dff)',
    logo: 'linear-gradient(90deg, #4a8cff, #ff6b8b)',
  },
  shadows: {
    header: '0 4px 12px rgba(0, 0, 0, 0.3)',
    card: '0 3px 8px rgba(0, 0, 0, 0.2)',
    button: '0 2px 5px rgba(74, 140, 255, 0.3)',
  },
  breakpoints: {
    desktop: '1100px',
    tablet: '768px',
    mobile: '480px',
  },
  fonts: {
    main: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    header: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
};

export default darkTheme;