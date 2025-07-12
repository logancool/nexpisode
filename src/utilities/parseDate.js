export const PST = 'T20:00:00';
export const toPST = (basicDate) =>
  basicDate.toLocaleString('en-US', { timeZone: 'PST' });

export const toSeconds = (UTCRemaining) => {
  const seconds = UTCRemaining / 1000;
  return {
    amount: seconds,
    unit: seconds > 1 ? 'seconds' : 'second',
  };
};

export const toMins = (UTCRemaining) => {
  const mins = toSeconds(UTCRemaining).amount / 60;
  return {
    amount: mins,
    unit: mins > 1 ? 'mins' : 'min',
  };
};

export const toHours = (UTCRemaining) => {
  const hours = toMins(UTCRemaining).amount / 60;
  return {
    amount: hours,
    unit: hours > 1 ? 'hours ' : 'hour',
  };
};

export const toDays = (UTCRemaining) => {
  const days = toHours(UTCRemaining).amount / 24;
  return {
    amount: days,
    unit: days > 1 ? 'days ' : 'day',
  };
};

export const toDaysHoursMinsSeconds = () => {
  return new Date();
};
