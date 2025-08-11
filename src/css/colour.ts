import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import colour from 'css/colourFile';

let themes = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: colour.ghostWhite,
    },
    primary: {
      main: colour.primary,
    },
  },
  typography: {
    h6: {
      fontSize: '1.5rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h4: {
      fontSize: '1.3rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    h3: {
      fontSize: '1.4rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h2: {
      fontSize: '1rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
    button: {
      fontSize: '0.875rem',
      fontFamily: '"Outfit", sans-serif',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: '6px 16px',
          backgroundColor: theme.palette.primary.main,
          color: colour.white,
          '&:hover': {
            backgroundColor: theme.palette.primary,
          },
          '@media (max-width:600px)': {
            padding: '4px 10px',
            minWidth: '80px',
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: colour.white,
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: colour.black,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colour.black,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: "16px",
          fontFamily: "'Outfit', sans-serif",
        },
        body: {
          fontWeight: 500,
          fontSize: "14px",
          fontFamily: "'Outfit', sans-serif",
        },
      },
    },
  },

});

themes = responsiveFontSizes(themes);

export default themes;
