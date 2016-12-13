import { combineReducers } from 'redux';
import appReducer from './app.reducer';
import transactionReducer from './transaction.reducer';

export default combineReducers({
  app: appReducer,
  transactions: transactionReducer,
});
