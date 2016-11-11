import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserTransactions } from '../../util/plaid.service.js';
import { getDaysPast, mapTransactions } from '../../util/date.service.js';
import styles from './app.styles.css';

// Actions
import { setUserData } from '../../actions/app.actions.js';


export class App extends Component {
  componentWillMount() {
    getUserTransactions()
    .then(res => {
      this.props.dispatch(setUserData({
        accounts: res.accounts,
        transactions: res.transactions,
        transactionsByDay: mapTransactions(getDaysPast(100), res.transactions),
      }));
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <h1>Cents</h1>
        {children}
      </div>
    );
  }
}

export default connect()(App);
