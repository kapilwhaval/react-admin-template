import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import Routes from './routes';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <BrowserRouter >
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)