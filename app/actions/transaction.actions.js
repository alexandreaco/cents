import { createAction } from 'redux-actions';
import { queryTransactions } from '../db/transactions.model';

// Constants
export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';

// async
const asyncThing = () => {
  return new Promise((resolve) => {
    return queryTransactions({})
    .then(res => resolve(res));
  });
};

// Actions
export const getAllTransactions = createAction(GET_ALL_TRANSACTIONS, async () => asyncThing());
