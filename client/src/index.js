import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import { persistor, store } from '../src/redux/stores/Store.js';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
    </StrictMode>
    , document.getElementById('root'));