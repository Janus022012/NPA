import React from 'react';
import AppBar from './ui/AppBar/AppBar';
import ScrollableTab from './ui/ScrollableTab/ScrollableTab';

export const App = () => {
  return (
    <React.Fragment>
      <AppBar />
      <ScrollableTab />
    </React.Fragment>
  );
};

export default App;
