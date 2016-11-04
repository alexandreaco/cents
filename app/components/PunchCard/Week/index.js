import React from 'react';
import styles from './week.styles.css';
import { getWeek } from '../../../util/date.service.js';

// Components
import Day from '../Day';

export function Week(props) {
  const { startDay } = props;
  const weekDays = getWeek(startDay || new Date());

  return (
    <div className={styles.root}>
      {weekDays.map((day, i) => (
        <Day key={i} day={day} />
      ))}
    </div>
  )
}

export default Week;
