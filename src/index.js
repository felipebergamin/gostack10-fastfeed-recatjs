import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/reactotron';
import Routes from './routes';
import { store, persistor } from './store';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
        <GlobalStyle />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
