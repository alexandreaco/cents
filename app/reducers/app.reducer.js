import { handleActions } from 'redux-actions';

import {
  SET_USER_DATA,
} from '../actions/app.actions.js';

const initialState = {
  user: {
    accounts: [],
    transactions: [],
  },
};

export default handleActions({

  [SET_USER_DATA]: (state, action) => ({
    ...state,
    user: action.payload,
  }),

}, initialState);
