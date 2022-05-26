import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Meta from './Meta';

import Test from './Test';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Meta />
        {/* <App /> */}
        <Test />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
