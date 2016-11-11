import React, { PropTypes } from 'react';
import styles from './week.styles.css';
import { getWeek } from '../../../util/date.service';

// Components
import Day from '../Day';

function Week(props) {
  const { startDay, transactions } = props;
  const weekDays = getWeek(startDay || new Date());

  return (
    <div className={styles.root}>
      {weekDays.map((day, i) => (
        <Day key={i} day={day} transactions={transactions[day]} />
      ))}
    </div>
  );
}

Week.propTypes = {
  startDay: PropTypes.instanceOf(Date),
  transactions: PropTypes.object,
};

export default Week;
