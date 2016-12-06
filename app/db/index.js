// Database
const Datastore = require('nedb');

const configureDatabase = () => {
  const db = {};
  db.app = new Datastore('./data/app.json');
  db.users = new Datastore('./data/users.json');
  db.accounts = new Datastore('./data/accounts.json');
  db.transactions = new Datastore('./data/transactions.json');

  // load databases
  db.app.loadDatabase();
  db.users.loadDatabase();
  db.accounts.loadDatabase();
  db.transactions.loadDatabase();
  return db;
};

export default configureDatabase;
