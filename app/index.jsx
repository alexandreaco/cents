import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';
import Calendar from './components/Calendar';

require('./main.css');

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Calendar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
