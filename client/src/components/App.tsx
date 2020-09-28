import React from 'react';
import AppBar from './ui/AppBar/AppBar';
import ScrollableTab from './ui/ScrollableTab/ScrollableTab';
import HomePage from './ui/HomePage/HomePage';

export const App = () => {
  return (
    <React.Fragment>
      <AppBar />
      <ScrollableTab />
      <HomePage />
    </React.Fragment>
  );
};

export default App;
