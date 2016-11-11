import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getWeek, mapTransactions } from '../../util/date.service';
import styles from './calendar.styles.css';
import Week from './Week';

const moment = require('moment');

function Calendar(props) {
  const { user } = props;
  return (
    <div className={styles.root}>
      <h2>Calendar</h2>
      <div className={styles.calendar}>
        {
          Object.keys(user.transactionsByDay).map((day, i) => (
            moment(day).weekday() === 0 && (
              <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), user.transactions)} />
            )
          ))
        }
      </div>
    </div>
  );
}

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    user: state.app.user,
  };
};

Calendar.propTypes = {
  user: PropTypes.shape({
    transactionsByDay: PropTypes.object,
  }),
};

export default connect(mapStateToProps)(Calendar);
