import React, { Component } from 'react';
import { getDaysPast, getWholeDay } from '../../util/date.service.js';
import styles from './punchcard.styles.css';

export class PunchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsByDay: [],
    }
  }

  componentWillMount() {
    const { transactions } = this.props;
    const daysPast = getDaysPast(100);

    // Get array where keys are date objects
    const transactionsByDay = {};
    daysPast.forEach(day => {
      transactionsByDay[day] = new Array();
    });

    // Populate array with transactions
    transactions.forEach(transaction => {
      const date = getWholeDay(new Date(transaction.date));
      if (transactionsByDay[date]) transactionsByDay[date].push(transaction);
    })

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
              <div key={i} className={styles.punch}>
                { this.state.transactionsByDay[day].length }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default PunchCard;
