const moment = require('moment');

export const getDaysPast = (daysAgo) => {
  const today = getWholeDay();
  const yesterday = getDayPast(daysAgo);
  const daysArray = [];

  for (let i = daysAgo; i > 0; i--) {
    daysArray.push( getDayPast(i));
  }
  return daysArray;
}

export const getDayPast = (daysAgo) => {
  const today = getWholeDay();
  let yesterday = getWholeDay().setDate(today.getDate() - daysAgo);
  return new Date(yesterday);
}

export const getWholeDay = (day) => {
  const date = day || new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export const getWeek = (day) => {
  const startOfWeek = moment(day).startOf('week');
  const endOfWeek = moment(day).endOf('week');
  const week = [];
  let d = startOfWeek;

  while (d <= endOfWeek) {
    week.push(d.toDate());
    d = d.clone().add(1, 'd');
  }
  return week;
}


export const mapTransactions = (someDays, transactions) => {
  const transactionsOverTime = {};
  // Build a list dates -> array objects
  someDays.forEach(day => {
    transactionsOverTime[day] = new Array();
  });
  // Attribute transactions to days in list
  transactions.forEach(transaction => {
    const date = getWholeDay(new Date(transaction.date));
    if (transactionsOverTime[date]) transactionsOverTime[date].push(transaction);
  })

  return transactionsOverTime;
}
