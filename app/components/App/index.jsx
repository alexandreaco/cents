import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserTransactions } from '../../util/plaid.service';
import { getDaysPast, mapTransactions } from '../../util/date.service';
import styles from './app.styles.css';

// Actions
import { setUserData } from '../../actions/app.actions';


class App extends Component {
  componentWillMount() {
    getUserTransactions()
    .then((res) => {
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default connect()(App);
