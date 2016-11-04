import 'babel-polyfill'; // generators
import React from 'react';
import { render as renderReact } from 'react-dom';
import debounce from 'debounce';
import configureStore from './store/configureStore';
import styles from './main.css';

const state = JSON.parse(localStorage.getItem('state'));
const store = configureStore(state || {});

let Root = require('./components/Root').default;
const render = (Component) => {
  renderReact(<Component {...store} />, document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept('./components/Root', function() {
    let newApp = require('./components/Root').default;
    render(newApp);
  });
}

const saveState = debounce(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
}, 1000);
store.subscribe(() => {
  saveState();
  render(Root);
  if (process.env.ENV === 'development') {
    console.log('state', store.getState());
  }
});
store.dispatch({ type: 'APP_INIT', store });
