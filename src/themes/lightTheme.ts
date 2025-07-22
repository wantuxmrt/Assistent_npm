import { Theme } from './themeTypes';

const lightTheme: Theme = {
  name: 'light',
  colors: {
    bgColor: '#f0f2f5',
    panelBg: '#ffffff',
    primary: '#4a8cff',
    secondary: '#6b4dff',
    accent: '#ff6b8b',
    text: '#333333',
    success: '#4ade80',
    warning: '#facc15',
    error: '#ff6b6b',
    bubbleUser: '#d6e4ff',
    bubbleBot: '#e0e7ff',
    editColor: '#facc15',
    searchBg: 'rgba(214, 228, 255, 0.7)',
    cardBg: 'rgba(224, 231, 255, 0.5)',
    filterBg: 'rgba(209, 219, 255, 0.8)',
    divider: 'rgba(74, 140, 255, 0.2)',
    critical: '#ff6b6b',
    high: '#ff9e6b',
    medium: '#facc15',
    low: '#4ade80',
    tableHeader: '#d6e4ff',
    tableRow: 'rgba(224, 231, 255, 0.3)',
    managerColor: '#9b5de5',
  },
  gradients: {
    userAvatar: 'linear-gradient(135deg, #4a8cff, #6b4dff)',
    logo: 'linear-gradient(90deg, #4a8cff, #ff6b8b)',
  },
  shadows: {
    header: '0 4px 12px rgba(0, 0, 0, 0.1)',
    card: '0 3px 8px rgba(0, 0, 0, 0.08)',
    button: '0 2px 5px rgba(74, 140, 255, 0.2)',
  },
  breakpoints: {
    desktop: '1100px',
    tablet: '768px',
    mobile: '480px',
  },
};

export default lightTheme;