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

  return data;
});
