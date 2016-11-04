import React from 'react';
import styles from './day.styles.css';

export function Day(props) {
  const { day, transactions } = props;
  let expense = 0;
  let income = 0;
  const date = new Date(day);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (transactions.length) {
    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        console.log(transaction.amount);
        expense -= transaction.amount;
      }
    })
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        console.info(transaction.amount);
        income += transaction.amount;
      }
    })
  }
  return (
    <div className={styles.root}>
      <p>{daysOfWeek[date.getDay()]} {date.getMonth()}/{date.getDate()}/{date.getFullYear()}</p>
      <p>Transactions: {transactions.length}</p>
      <p>Expense: {expense}</p>
      <p>Income: {income}</p>
    </div>
  )
}

export default Day;
