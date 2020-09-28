import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const white = '#FFFFFF';
const black = '#000000';

const paletteThemes: PaletteOptions = {
  common: {
    white: white,
    black: black,
  },
  primary: {
    light: '#f2ee52',
    main: '#eee92e',
    dark: '#e5dd14',
    50: '#fdfde7',
    100: '#fbf9c2',
    200: '#f8f599',
    300: '#f5f170',
    400: '#f2ee52',
    500: '#f0eb33',
    600: '#eee92e',
    700: '#ece527',
    800: '#e9e220',
    900: '#e5dd14',
    A100: '#ffffff',
    A200: '#fffee1',
    A400: '#fffcae',
    A700: '#fffb95',
  },
  secondary: {
    light: '#525b6b',
    main: '#2e384a',
    dark: '#141b27',
    50: '#e7e8ea',
    100: '#c2c5cb',
    200: '#999fa8',
    300: '#707885',
    400: '#525b6b',
    500: '#333e51',
    600: '#2e384a',
    700: '#273040',
    800: '#202837',
    900: '#141b27',
    A100: '#6a9cff',
    A200: '#377aff',
    A400: '#0458ff',
    A700: '#004eea',
  },
};

export default paletteThemes;
