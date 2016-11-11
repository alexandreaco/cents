import React, { PropTypes } from 'react';

export function Accounts(props) {
  const { accounts } = props;
  return (
    <div className="account">
      <h2>Accounts</h2>
      {
        accounts.map((account, i) => (
          <div key={i}>
            <div>
              {account.meta.name}, <small>{account.type}</small> :
              <pre>${account.balance.available || account.balance.current}</pre>
            </div>
          </div>
        ))
      }
    </div>
  );
}

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    meta: PropTypes.shape({
      name: PropTypes.string,
    }),
    type: PropTypes.stying,
    balance: PropTypes.shape({
      available: PropTypes.number,
      current: PropTypes.number,
    }),
  })).isRequired,
};

export default Accounts;
