import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';
import Welcome from './components/Welcome';
import Calendar from './components/Calendar';
import configureDatabase from './db';

require('./main.css');

const store = configureStore();
const db = configureDatabase();

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="calendar" component={Calendar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
