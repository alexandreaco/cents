const moment = require('moment');
import React from 'react';
import { connect } from 'react-redux';
import { getWeek, mapTransactions } from '../../util/date.service.js';
import styles from './calendar.styles.css';

// Components
import Week from './Week';

export function Calendar(props) {
  const { user } = props;
  return (
    <div className={styles.root}>
      <h2>Calendar</h2>
      <div className={styles.calendar}>
      {
        Object.keys(user.transactionsByDay).map((day, i) => (
          moment(day).weekday() === 0 && (
            <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), user.transactions)}/>
          )
        ))
      }
      </div>
    </div>
  )
}

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
}

export default connect(mapStateToProps)(Calendar);
