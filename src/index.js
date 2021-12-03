// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import rootReducer, { rootSaga } from './js/reducer';
import createSagaMiddleware from 'redux-saga';

// Components
import App from './js/App';

// Style
import './style.scss';

// Proxy
import * as serviceWorker from './serviceWorker';

console.log('test');

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, sagaMiddleware),
);
// const store = createStore(rootReducer, applyMiddleware(reduxLogger));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
