import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { getInstitutions, createPlaidUser } from '../../util/plaid.service';
import { getDaysPast, mapTransactions } from '../../util/date.service';
import styles from './welcome.styles.css';

// Actions
import { setUserData } from '../../actions/app.actions';

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      institutions: [],
      error: null,
      mfa: null,
    };
  }

  componentWillMount() {
    getInstitutions()
    .then((res) => {
      this.setState({ institutions: res });
    });
  }

  _handleSubmit = () => {
    const institutionId = this.refs.institution.value;
    const institution = this.state.institutions.find(el => el.id === institutionId);

    const options = {
      type: institution.type,
      username: this.refs.username.value,
      password: this.refs.password.value,
    };

    createPlaidUser(options)
    .then((res) => {
      this.setState({
        mfa: null,
        error: null,
      });
      if (res.mfa) {
        this.setState({
          mfa: res.mfa,
        });
      } else if (res.access_token) {
        this.props.dispatch(setUserData({
          accounts: res.accounts,
          transactions: res.transactions,
          transactionsByDay: mapTransactions(getDaysPast(100), res.transactions),
        }));
        hashHistory.push('/calendar');
      }
    })
    .catch((err) => {
      // console.warn(err);
      this.setState({
        error: err,
      });
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.intro}>
          <h1>Welcome to Cents!</h1>
          <p>
            I can help you visualize your finances and make smarter decisions.
            I work best when I'm in sync with your bank accounts and credit cards.
            Select a bank you use to get started.
          </p>

          <form onSubmit={this._handleSubmit}>
            <select ref="institution">
              {
                this.state.institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))
              }
            </select>
            <input type="text" ref="username" placeholder="bank username" />
            <input type="password" ref="password" placeholder="bank password" />
            <button>Connect</button>
            {
              this.state.error && (
                <div className={styles.error}>
                  <p>{this.state.error.message}</p>
                  <p>{this.state.error.resolve}</p>
                </div>
              )
            }

            {
              this.state.mfa && (
                <div className={styles.mfa}>
                  <p>Please answer this question to verify your identity</p>
                </div>
              )
            }
          </form>
        </div>

      </div>
    );
  }
}

Welcome.propTypes = {};

export default connect()(Welcome);
