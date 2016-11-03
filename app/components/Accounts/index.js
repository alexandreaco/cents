import React from 'react';

export function Accounts(props) {
  const { accounts } = props;
  return (
    <div className="account">
      <h2>Accounts</h2>
      {
        accounts.map((account, i) => (
          <div key={i}>
            <p>{account.meta.name}, <small>{account.type}</small> : <pre>${account.balance.available || account.balance.current}</pre></p>
          </div>
        ))
      }
    </div>
  )
}

export default Accounts;
