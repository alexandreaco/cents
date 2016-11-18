require('dotenv').config();

export const createPlaidUser = (options) => {
  const url = 'https://tartan.plaid.com/connect';
  const { type, username, password } = options;
  return fetch(`${url}?public_key=${process.env.PLAID_KEY}&client_id=${process.env.PLAID_CLIENT}&secret=${process.env.PLAID_SECRET}&type=${type}&username=${username}&password=${password}`, {
    method: 'post',
  })
  .then((res) => {
    return res.json();
  }).then((json) => {
    // console.log(json);
    if (json.code) throw json;
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

export const getInstitutions = () => {
  return fetch('https://tartan.plaid.com/institutions', {
    method: 'get',
  })
  .then(res => res.json())
}
