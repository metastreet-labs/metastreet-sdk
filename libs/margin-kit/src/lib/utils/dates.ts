const SECONDS_IN_ONE_DAY = 86400;

export const daysFromSeconds = (seconds: number) => Math.floor(seconds / SECONDS_IN_ONE_DAY);

export const daysToSeconds = (days: number) => days * SECONDS_IN_ONE_DAY;
