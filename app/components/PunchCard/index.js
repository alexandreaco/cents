const moment = require('moment');
import React, { Component } from 'react';
import { getDaysPast, getWholeDay, getWeek } from '../../util/date.service.js';
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

  getTransactionsForWeek = (day) => {
    const { transactions } = this.props;
    const thisWeek = getWeek(day);
    const transactionsForWeek = {};
    thisWeek.forEach(day => {
      transactionsForWeek[day] = new Array();
    });
    transactions.forEach(transaction => {
      const date = getWholeDay(new Date(transaction.date));
      if (transactionsForWeek[date]) transactionsForWeek[date].push(transaction);
    })
    return transactionsForWeek;
  }

  componentWillMount() {
    const { transactions } = this.props;
    const daysPast = getDaysPast(30);

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


    // console.log(transactionsByDay);
    // const weeks = [];
    // Object.keys(transactionsByDay).forEach((day, i) => {
    //   if (new Date(day).getDay() === 0) {
    //     console.log('SUNDAY');
    //     console.log(transactionsByDay[day]);
    //     const thisWeek = transactionsByDay.slice(i, i+6);
    //     weeks.push(thisWeek);
    //   }
    // })
    // console.log(weeks);
  }

  render() {
    const { transactions } = this.props;
    Object.keys(this.state.transactionsByDay).forEach((day, i) => {
      // console.log(this.state.transactionsByDay[day]);
      // console.log(moment(day).weekday());
      // // If it is a Sunday, build a new week
      // if (moment(day).weekday() === 0) {
      //   console.log('---------')
      //   console.log(`a new week starting at ${day}`);
      //   console.log(getWeek(day));
      //   console.info(this.getTransactionsForWeek(day));
      // }
    })

    // return (
      // <div className={styles.root}>
      //   <h2>PunchCard</h2>
      //   <div className={styles.punchcard}>
      //     {
      //       Object.keys(this.state.transactionsByDay).map((day, i) => (
      //         <Day key={i} day={day} transactions={this.state.transactionsByDay[day]} />
      //       ))
      //     }
      //   </div>
      // </div>
    // )
    return (
      <div className={styles.root}>
        <h2>PunchCard</h2>
        <div className={styles.punchcard}>
        {
          Object.keys(this.state.transactionsByDay).map((day, i) => (
            moment(day).weekday() === 0 && (
              <Week startDay={new Date(day)} key={i} transactions={this.getTransactionsForWeek(day)}/>
            )
          ))
        }
        </div>
      </div>
    )
  }
}

export default PunchCard;
