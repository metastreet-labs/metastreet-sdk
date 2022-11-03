const SECONDS_IN_ONE_DAY = 86400;

export const daysFromSeconds = (seconds: number) => Math.ceil(seconds / SECONDS_IN_ONE_DAY);

export const secondsFromDays = (days: number) => days * SECONDS_IN_ONE_DAY;
