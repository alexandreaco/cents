const moment = require('moment');
import React from 'react';
import styles from './day.styles.css';

export function Day(props) {
  const { day, transactions } = props;
  let expense = 0;
  let income = 0;

  // Build expenses and income counts
  if (transactions && transactions.length) {
    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        expense -= transaction.amount;
      }
    })
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    })
  }
  // Set day specific styles
  const isToday = moment().diff(new Date(day), 'days') === 0;
  const rootStyles = isToday ? styles.today : styles.root;

  return (
    <div className={rootStyles}>
      <p>{moment(day).format('MMM Do \'YY')}</p>
      {transactions && <p>Transactions: {transactions.length}</p>}
      <p>Expense: {expense}</p>
      <p>Income: {income}</p>
    </div>
  )
}

export default Day;
