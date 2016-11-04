import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import styles from './main.css';

const store = configureStore();
import Root from './components/Root';
import PunchCard from './components/PunchCard';

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Root}>
        <IndexRoute component={PunchCard} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
