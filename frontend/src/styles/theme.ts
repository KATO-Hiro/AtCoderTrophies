import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// See:
// https://github.com/mui-org/material-ui/tree/next/examples/nextjs
// // https://www.ansonlowzf.com/create-a-website-with-material-ui-v5-nextjs/
// Create a theme instance.
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#6f2fff',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  }),
);

export default theme;
