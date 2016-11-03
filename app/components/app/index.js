import React, { Component } from 'react';
import { getUserTransactions } from '../../util/plaid.service.js';
import styles from './app.styles.css';

// Components
import Accounts from '../Accounts';
import PunchCard from '../PunchCard';

export class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      transactions: [],
    }
  }

  componentWillMount() {
    getUserTransactions().then(res => {

      this.setState({
        accounts: res.accounts,
        transactions: res.transactions,
      })
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <h1>Cents</h1>
        <Accounts accounts={this.state.accounts} />
        {
          this.state.transactions.length && <PunchCard transactions={this.state.transactions} />
        }
      </div>
    );
  }
}

export default app;
