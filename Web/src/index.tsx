import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import store from './store';
import mainTheme from 'models/themes/mainTheme';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';

import * as serviceWorker from './serviceWorker';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={mainTheme}>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  rootElement,
);

serviceWorker.unregister();
