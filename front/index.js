import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './core/store';
import Robolaire from './components/Robolaire';


ReactDOM.render(
  <Provider store={store}>
    <Robolaire />
  </Provider>,
  document.getElementById('root')
);
