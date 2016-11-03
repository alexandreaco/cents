import React, { Component } from 'react';
import { getDaysPast, getWholeDay } from '../../util/date.service.js';

export class PunchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsByDay: [],
    }
  }

  componentWillMount() {
    const { transactions } = this.props;
    const daysPast = getDaysPast(30);

    // Get array where keys are date objects
    const transactionsByDay = {};
    daysPast.forEach(day => {
      transactionsByDay[day] = new Array();
    });

    // Populate array with transactions
    transactions.forEach(transaction => {
      const date = getWholeDay(new Date(transaction.date));
      if (transactionsByDay[date]) transactionsByDay[date].push(transaction);
    })

    this.setState({
      transactionsByDay: transactionsByDay,
    })
  }

  render() {
    const { transactions } = this.props;

    return (
      <div className="punchcard">
        <h2>PunchCard</h2>
        {
          Object.keys(this.state.transactionsByDay).map((day, i) => (
            <div key={i}>
              <b>{day}</b>
                {
                  this.state.transactionsByDay[day].map((transaction, i) => (
                    <div key={i}><em>{transaction.date}</em>{transaction.name} : <pre>${transaction.amount}</pre></div>
                  ))
                }
            </div>
          ))
        }
      </div>
    )
  }
}

export default PunchCard;
