const padTo2Digits = (num) => {
  return num.toString().padStart(2, '0');
};

const addZeroToTime = (time) => {
  return time < 10 ? '0' + time : time;
};

export const formatDate = (date) => {
  return (
    [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/') +
    ' ' +
    addZeroToTime(date.getHours()) +
    ':' +
    addZeroToTime(date.getMinutes()) +
    ':' +
    addZeroToTime(date.getSeconds())
  );
};
