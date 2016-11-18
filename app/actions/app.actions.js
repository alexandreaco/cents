import { createAction } from 'redux-actions';
import configureDatabase from '../db';

// Constants
export const SET_USER_DATA = 'SET_USER_DATA';

const db = configureDatabase();

// Actions
export const setUserData = createAction(SET_USER_DATA, (data) => {
  // Check for userData
  db.app.find({ type: 'userData' }, (err, docs) => {
    // Add userData if not present
    if (docs.length <= 0) {
      const user = {
        type: 'userData',
        access_token: data.access_token,
      };
      db.app.insert(user, () => {});
    } else {
      // Update access_token
      const query = { type: 'userData' };
      const update = { $set: { access_token: data.access_token } };
      const options = {};
      db.app.update(query, update, options, () => {});
    }
  });

  // Store and update accounts
  data.accounts.forEach((account) => {
    db.accounts.find({ _id: account._id }, (err, docs) => {
      if (docs.length <= 0) {
        db.accounts.insert(account);
      } else {
        db.accounts.update({ _id: account._id }, account);
      }
    });
  });

  // Store transactions
  data.transactions.forEach((transaction) => {
    db.transactions.find({ _id: transaction._id }, (err, docs) => {
      if (docs.length <= 0) {
        db.transactions.insert(transaction);
      }
    });
  });

  return data;
});
