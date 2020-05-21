import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Root from './Root';
import { grey } from '@material-ui/core/colors';
import { CookiesProvider } from 'react-cookie';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a5d6a7",
    },
    secondary: {
      main: "#757575",
    },
    background: {
      paper: grey[100]
    }
  },
  overrides: {
    MuiButton: {
      textPrimary: {
        color: grey[800]
      },
      textSecondary: {
        color: grey[600]
      },
    },
  }
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <Root />
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
}
export default App;
