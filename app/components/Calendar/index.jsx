import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getWeek, getDaysPast, mapTransactions } from '../../util/date.service';
import { getAllTransactions } from '../../actions/transaction.actions';
import styles from './calendar.styles.css';
import Week from './Week';

const moment = require('moment');

class Calendar extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAllTransactions());
  }

  render() {
    const { allTransactions, transactionsByDay } = this.props;
    return (
      <div className={styles.root}>
        <h2>Calendar</h2>
        <div className={styles.calendar}>
          {
            getDaysPast(1000).map((day, i) => (
              moment(day).weekday() === 0 && (
                <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), allTransactions)} />
              )
            ))
          }
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
const mapStateToProps = (state) => {
  return {
    allTransactions: state.transactions.all,
  };
};

Calendar.propTypes = {
  allTransactions: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Calendar);
