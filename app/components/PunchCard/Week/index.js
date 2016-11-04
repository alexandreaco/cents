import React from 'react';
import styles from './week.styles.css';

// Components
import Day from '../Day';

export function Week(props) {
  const { transactions, days } = props;

  return (
    <div className={styles.root}>
      {days.map((day, i) => (
        <Week key={i} day={day} transactions={transactions[day]} />
      ))}
    </div>
  )
}

export default Week;
