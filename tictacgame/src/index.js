import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore } from 'redux';
import ticTacToeReducer from './reducers/reducer';
import './index.css';
import App from './App';

const store = legacy_createStore(ticTacToeReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);