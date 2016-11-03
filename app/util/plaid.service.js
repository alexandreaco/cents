require('dotenv').config();



export const createPlaidUser = () => {
  return fetch(`https://tartan.plaid.com/connect?public_key=${process.env.PLAID_KEY}&client_id=${process.env.PLAID_CLIENT}&secret=${process.env.PLAID_SECRET}&type=${process.env.TYPE}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}`, {
    method: 'post',
  })
  .then(function(res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
    return json;
  });
}

export const getUserTransactions = () => {
  return fetch(`https://tartan.plaid.com/connect/get?client_id=${process.env.PLAID_CLIENT}&secret=${process.env.PLAID_SECRET}&type=${process.env.TYPE}&username=${process.env.USERNAME}&password=${process.env.PASSWORD}&access_token=${process.env.ACCESS_TOKEN}`, {
    method: 'post',
  })
  .then(function(res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
    return json;
  });
}
