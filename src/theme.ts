import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5700c9',
    },
    secondary: {
      main: blue[700],
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h6: {
      fontWeight: 600,
    },
    body2: {
      fontStyle: 'italic',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
export default theme;
