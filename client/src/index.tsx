import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import 'ress';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
);
