import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getWeek, getDaysPast, mapTransactions } from '../../util/date.service';
import { getAllTransactions } from '../../actions/transaction.actions';
import styles from './calendar.styles.css';
import Week from './Week';

const moment = require('moment');

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsByDay: mapTransactions(getDaysPast(600), this.props.user.transactions),
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getAllTransactions());
  }

  render() {
    const { user } = this.props;
    return (
      <div className={styles.root}>
        <h2>Calendar</h2>
        <div className={styles.calendar}>
          {
            Object.keys(this.state.transactionsByDay).map((day, i) => (
              moment(day).weekday() === 0 && (
                <Week startDay={new Date(day)} key={i} transactions={mapTransactions(getWeek(day), user.transactions)} />
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
    user: state.app.user,
  };
};

Calendar.propTypes = {
  user: PropTypes.shape({
    transactions: PropTypes.array,
  }),
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Calendar);
