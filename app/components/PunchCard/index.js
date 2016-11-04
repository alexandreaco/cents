const moment = require('moment');
import React, { Component } from 'react';
import { getDaysPast, getWholeDay, getWeek, mapTransactions } from '../../util/date.service.js';
import styles from './punchcard.styles.css';

// Components
import Day from './Day';
import Week from './Week';

export class PunchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsByDay: [],
    }
  }


  componentWillMount() {
    const { transactions } = this.props;
    const transactionsByDay = mapTransactions(getDaysPast(200), transactions);

    this.setState({
      transactionsByDay: transactionsByDay,
    })
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className={styles.root}>
        <h2>PunchCard</h2>
        <div className={styles.punchcard}>
        {
          Object.keys(this.state.transactionsByDay).map((day, i) => (
            moment(day).weekday() === 0 && (
              <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), transactions)}/>
            )
          ))
        }
        </div>
      </div>
    )
  }
}

export default PunchCard;
