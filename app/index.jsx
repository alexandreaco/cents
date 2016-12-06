import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';
import Welcome from './components/Welcome';
import Calendar from './components/Calendar';
import { isLoggedIn } from './util/auth.service';

require('./main.css');

const store = configureStore();

const authUser = (nextState, replace, callback) => {
  isLoggedIn()
  .then((auth) => {
    if (!auth) replace('/welcome');
    callback();
  })
  .catch((error) => {
    callback(error);
  });
};

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Calendar} onEnter={authUser} />
        <Route path="welcome" component={Welcome} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
