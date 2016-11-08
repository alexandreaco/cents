const moment = require('moment');
import React from 'react';
import { connect } from 'react-redux';
import styles from './day.styles.css';

export function Day(props) {
  const { day, transactions, accounts } = props;
  let expense = 0;
  let income = 0;

  // Build expenses and income counts
  if (transactions && transactions.length) {
    transactions.forEach(transaction => {
      //---
      //  Don't include...
      //  - credit card payments
      //  - transfers
      //
      let ignore = false;
      let modifier = 1;
      if (transaction.category) {
        if (
          transaction.category.indexOf('Payment') >= 0 && transaction.category.indexOf('Credit Card') >= 0
          || transaction.category.indexOf('Payment') >= 0 && transaction.category.indexOf('Debit') >= 0
          || transaction.category.indexOf('Internal Account Transfer') >= 0
        ) {
          ignore = true;
          // console.warn(transaction);
        }
      }

      // Populate expenses and income!
      // Multiple by -1 to get expected values.
      // i.e. user expenses $10, but card registers a debt +10
      if (!ignore) {
        if (transaction.amount * -1 < 0) {
          expense -= (transaction.amount * -1);
        }
        if (transaction.amount * -1 > 0) {
          income += (transaction.amount * -1);
        }
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

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    accounts: state.app.user.accounts,
  };
}

export default connect(mapStateToProps)(Day);
