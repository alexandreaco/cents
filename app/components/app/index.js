import React, { Component } from 'react';
import { getPlaidData } from '../../util/plaid.service.js';

export class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      transactions: [],
    }
  }

  componentWillMount() {
    getPlaidData().then(res => {

      this.setState({
        accounts: res.accounts,
        transactions: res.transactions,
      })
    });
  }

  render() {
    return (
      <div className="root">
        <h1>Cents</h1>
        <div className="account">
          <h2>Accounts</h2>
          {
            this.state.accounts.map((account, i) => (
              <div>
                <p>{account.meta.name}, <small>{account.type}</small></p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default app;
