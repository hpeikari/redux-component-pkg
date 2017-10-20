import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import App from './containers/App';
import initialState from './constants/initialState';

import myAppReducer from './reducers';
import { packageReducer } from 'redux-component-pkg';

const reducers = combineReducers({
  myAppData: myAppReducer,
  packageData: packageReducer
});

const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
