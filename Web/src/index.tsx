import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import store from './store';
import mainTheme from 'models/themes/mainTheme';
import { ThemeProvider } from '@material-ui/styles';

import * as serviceWorker from './serviceWorker';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  rootElement,
);

serviceWorker.unregister();
