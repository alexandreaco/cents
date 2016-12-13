import { getTransactionDatabase } from '../db';

export const queryTransactions = (query) => {
  const transactions = getTransactionDatabase();
  return new Promise((resolve) => {
    transactions.find(query, (err, docs) => {
      if (err) console.warn(err);
      resolve(docs);
    });
  });
};
