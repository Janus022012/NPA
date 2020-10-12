import React, { FC } from 'react';
import AppBar from './ui/AppBar/AppBar';
import ScrollableTab from './ui/ScrollableTab/ScrollableTab';

export const App: FC = () => {
  return (
    <React.Fragment>
      <AppBar />
      <ScrollableTab />
    </React.Fragment>
  );
};

export default App;
