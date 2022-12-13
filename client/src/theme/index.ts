import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import oxagonLogo from '../assets/home_background.png';
import '@fontsource/poppins';

export const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          backgroundImage: oxagonLogo,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      },
    },
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
