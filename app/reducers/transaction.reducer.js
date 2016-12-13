import { handleActions } from 'redux-actions';

import {
  GET_ALL_TRANSACTIONS,
} from '../actions/transaction.actions';

const initialState = {
  all: [],
};

export default handleActions({

  [GET_ALL_TRANSACTIONS]: (state, action) => ({
    ...state,
    all: action.payload,
  }),

}, initialState);
