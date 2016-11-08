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
  const dateObj = new Date(day);
  const isFuture = moment().diff(dateObj, 'days') <= 0;
  const rootStyles = isFuture ? styles.future : styles.root;
  const isNewMonth = moment(dateObj).date() === 1;
  let monthLabel = null;
  if (isNewMonth) {
    monthLabel = (
      <div className={styles.month}>
        <span className={styles.monthLabel}>{moment(dateObj).format('MMMM')}</span>
      </div>
    )
  }
  return (
    <div className={rootStyles}>
      <div className={styles.date}>{moment(day).format('Do')}</div>
      {isNewMonth && monthLabel}
      {!isFuture && (
        <div className={styles.values}>
          <span className={expense > 0 ? styles.expense : styles.mute}>-{Math.round(expense * 100) / 100}</span>
          <span className={styles.mute}>/</span>
          <span className={income > 0 ? styles.income : styles.mute}>+{Math.round(income * 100) / 100}</span>
        </div>
      )}
    </div>
  )
}

export default Day;
