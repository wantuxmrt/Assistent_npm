import { ThemeProvider } from '@emotion/react';
import { themes } from '../src/themes';
import { GlobalStyles } from '../src/assets/styles/global';
import React from 'react';
import { withRouter } from 'storybook-addon-react-router-v6';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themes.dark}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
  withRouter
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#0f1b2d'
      },
      {
        name: 'light',
        value: '#ffffff'
      }
    ]
  }
};