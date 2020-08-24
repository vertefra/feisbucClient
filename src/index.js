// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js'
import * as serviceWorker from './serviceWorker';

// ENTRY POINT FOR REACT DOM

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
