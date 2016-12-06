import { getUsersDatabase } from '../db';

export const isLoggedIn = () => {
  const users = getUsersDatabase();
  return new Promise((resolve) => {
    users.find({}, (err, docs) => {
      if (docs.length > 0) resolve(true);
      resolve(false);
    });
  });
};
