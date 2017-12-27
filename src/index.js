import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import App from './containers/app';
import { store } from './store';
import './assets/styles/style.scss';

ReactDOM.render(
  <Provider store = { store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
   document.querySelector('.container-fluid')
 );
