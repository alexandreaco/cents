import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import styles from './main.css';

const store = configureStore();
import App from './components/App';
import Calendar from './components/Calendar';

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Calendar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
