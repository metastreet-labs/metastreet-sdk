const SECONDS_IN_ONE_DAY = 86400;

export const daysFromSeconds = (seconds: number, round?: "up" | "down") => {
  const rounder = round == "up" ? Math.ceil : Math.floor;
  return rounder(seconds / SECONDS_IN_ONE_DAY);
};

export const daysToSeconds = (days: number) => days * SECONDS_IN_ONE_DAY;
