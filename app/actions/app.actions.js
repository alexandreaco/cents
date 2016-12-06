import { createAction } from 'redux-actions';
import configureDatabase from '../db';

// Constants
export const SET_USER_DATA = 'SET_USER_DATA';

const db = configureDatabase();

// Actions
export const setUserData = createAction(SET_USER_DATA, (data) => {
  // Store user data
  const { access_token, institution } = data;
  db.users.find({ _id: access_token }, (err, docs) => {
    if (docs.length <= 0) {
      db.users.insert({
        _id: access_token,
        institution,
      });
    } else {
      // probably don't want to update.
      // TODO: should throw an error that account already exists
      db.users.update({
        _id: access_token,
        institution,
      });
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
