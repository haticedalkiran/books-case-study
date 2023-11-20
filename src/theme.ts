import { createTheme, CSSVariablesResolver, Card } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'orange',
  colors: {
    orange: [
      '#fff0e3',
      '#ffe0cd',
      '#ffc19b',
      '#ff9f64',
      '#fe8137',
      '#fe701a',
      '#ff6609',
      '#e45400',
      '#cb4a00',
      '#b13d00',
    ],
    green: [
      '#ecfbec',
      '#dcf2dd',
      '#b9e1bc',
      '#93d198',
      '#74c37a',
      '#60ba66',
      '#53b65b',
      '#449f4b',
      '#398d40',
      '#2b7b34',
    ],
  },

  components: {
    Card: Card.extend({
      defaultProps: {
        bg: 'var(--mantine-color-body)',
        withBorder: true,
      },
      styles: {
        root: {
          border: '1px solid var(--mantine-color-default-border)',
        },
      },
    }),
  },
  other: {
    backgroundColor: '#fcf7f8',
    backgroundColorDark: '#1a1b1e',
    borderColor: '#e5e5e5',
  },
});
export const resolver: CSSVariablesResolver = (customTheme) => ({
  variables: {
    '--mantine-color-body': customTheme.other.backgroundColor,
    '--mantine-color-default-border': customTheme.other.borderColor,
  },
  light: {
    '--mantine-color-body': customTheme.other.backgroundColor,
    '--mantine-color-default-border': customTheme.other.borderColor,
  },
  dark: {
    '--mantine-color-body': customTheme.other.backgroundColorDark,
    '--mantine-color-default-border': customTheme.other.borderColor,
  },
});
