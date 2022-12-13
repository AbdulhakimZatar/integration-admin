import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import '@fontsource/poppins/variable.css';

export const theme = extendTheme(
  {
    fonts: {
      heading: 'Poppins',
      body: 'Poppins',
    },
    colors: { ...proTheme.colors, brand: proTheme.colors.blue },
    semanticTokens: {
      colors: {
        test: 'red',
      },
    },
  },
  proTheme,
);
