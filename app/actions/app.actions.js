import { createAction } from 'redux-actions';
import configureDatabase, { getUsersDatabase } from '../db';

// Constants
export const SET_USER_DATA = 'SET_USER_DATA';
export const GET_USER_DATA = 'GET_USER_DATA';

const db = configureDatabase();

// Actions
export const setUserData = createAction(SET_USER_DATA, (data) => {
  // Store user data
  const { access_token, institution } = data;
  const users = getUsersDatabase();
  users.find({ _id: access_token }, (err, docs) => {
    if (docs.length <= 0) {
      users.insert({
        _id: access_token,
        institution,
      });
    } else {
      // TODO: should throw an error that account already exists
      // console.info('user already exists');
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

  // // Store transactions
  // data.transactions.forEach((transaction) => {
  //   db.transactions.find({ _id: transaction._id }, (err, docs) => {
  //     if (docs.length <= 0) {
  //       db.transactions.insert(transaction);
  //     }
  //   });
  // });

  return data;
});
