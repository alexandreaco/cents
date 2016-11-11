require('dotenv').config();

export const createPlaidUser = () => {
  const url = 'https://tartan.plaid.com/connect';
  return fetch(`${url}?public_key=${process.env.PLAID_KEY}&client_id=${process.env.PLAID_CLIENT}&secret=${process.env.PLAID_SECRET}&type=${process.env.TYPE}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}`, {
    method: 'post',
  })
  .then((res) => {
    return res.json();
  }).then((json) => {
    // console.log(json);
    return json;
  });
};

export const getUserTransactions = () => {
  return fetch(`https://tartan.plaid.com/connect/get?client_id=${process.env.PLAID_CLIENT}&secret=${process.env.PLAID_SECRET}&type=${process.env.TYPE}&access_token=${process.env.ACCESS_TOKEN}`, {
    method: 'post',
  })
  .then((res) => {
    return res.json();
  }).then((json) => {
    // console.log(json);
    return json;
  });
};
