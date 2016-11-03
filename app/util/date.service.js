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
