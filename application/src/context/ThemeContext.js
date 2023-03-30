import { ThemeOptions } from '@mui/material/styles';
import { lime } from '@mui/material/colors';

// use theme OR use  mui/material/colors?
export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#84cc16',
        },
        secondary: {
          main: '#84cc16',
        },
        background: {
          default: '#262626',
          paper: '#404040',
        },
      },
})

