import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import App from './src/components/App';
import reducers from './src/reducers/reducers';
import initialState from './src/initialState';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, initialState)}>
    <App />
  </Provider>
  , document.getElementById('app'));