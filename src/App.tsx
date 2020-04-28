import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Root from './Root';
import {  indigo, teal, grey } from '@material-ui/core/colors';




const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: teal,
    background:{
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
     <ThemeProvider  theme={theme}>
            <Root />
        </ThemeProvider>
    </>
  );
}
export default App;
