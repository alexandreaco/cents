const moment = require('moment');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDaysPast, getWholeDay, getWeek, mapTransactions } from '../../util/date.service.js';
import styles from './punchcard.styles.css';

// Components
import Week from './Week';

export class PunchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsByDay: [],
    }
  }


  componentWillMount() {
    const { user } = this.props;
    const transactionsByDay = mapTransactions(getDaysPast(90), user.transactions);

    this.setState({
      transactionsByDay: transactionsByDay,
    })
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.root}>
        <h2>PunchCard</h2>
        <div className={styles.punchcard}>
        {
          Object.keys(this.state.transactionsByDay).map((day, i) => (
            moment(day).weekday() === 0 && (
              <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), user.transactions)}/>
            )
          ))
        }
        </div>
      </div>
    )
  }
}

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
}

export default connect(mapStateToProps)(PunchCard);
