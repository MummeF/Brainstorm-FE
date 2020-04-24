import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Root from './Root';
import {  indigo, teal } from '@material-ui/core/colors';




const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: teal,
  },
  overrides: {
    MuiButton: {
      textPrimary: {
        color: "#616161"
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
