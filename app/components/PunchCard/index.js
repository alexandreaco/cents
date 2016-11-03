import React from 'react';

export function PunchCard(props) {
  const { transactions } = props;
  return (
    <div className="punchcard">
      <h2>PunchCard</h2>
      {
        transactions.map((transaction, i) => (
          <div key={i}>
            <p><em>{transaction.date}</em>{transaction.name} : <pre>${transaction.amount}</pre></p>
          </div>
        ))
      }
    </div>
  )
}

export default PunchCard;
