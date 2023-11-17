import {
  MantineThemeOverride,
  createTheme,
  CSSVariablesResolver,
  Button,
  Card,
} from '@mantine/core';

export const theme = createTheme({
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
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-color-body': theme.other.backgroundColor,
    '--mantine-color-default-border': theme.other.borderColor,
  },
  light: {
    '--mantine-color-body': theme.other.backgroundColor,
    '--mantine-color-default-border': theme.other.borderColor,
  },
  dark: {
    '--mantine-color-body': theme.other.backgroundColorDark,
    '--mantine-color-default-border': theme.other.borderColor,
  },
});
