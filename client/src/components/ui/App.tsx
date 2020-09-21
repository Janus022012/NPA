import React from 'react';
// Material-UI
import { ThemeProvider } from '@material-ui/styles';
// Self-Made
import theme from './theme/Theme';
import Header from './Header/Header';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <h1>Hello, World!</h1>
      </Header>
    </ThemeProvider>
  );
};

export default App;
