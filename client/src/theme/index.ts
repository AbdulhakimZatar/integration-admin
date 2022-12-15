import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import oxagonLogo from '../assets/home_background.png';
import '@fontsource/poppins';
import { ButtonStyle } from './components/button';

export const theme = extendTheme(
  {
    components: {
      Button: ButtonStyle,
    },
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
    colors: {
      ...proTheme.colors,
      brand: {
        black: '#262626',
        darkBlue: '#122840',
      },
    },
  },
  proTheme,
);
