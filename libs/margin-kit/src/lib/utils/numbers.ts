import Decimal from "decimal.js";
import { ethers } from "ethers";

/**************************************************************************/
/* From and To units
/**************************************************************************/

const decimals = 18;

export const fromUnits = (value: ethers.BigNumber | Decimal) => {
  return new Decimal(`${value}`).div(`1e${decimals}`).toSignificantDigits(6, Decimal.ROUND_DOWN);
};

export const toUnits = (value: number) => {
  const bigNum = ethers.utils.parseUnits(`${value}`, decimals);
  return new Decimal(`${bigNum}`);
};

/**************************************************************************/
/* Pretty formatting 
/**************************************************************************/

// Source: https://stackoverflow.com/a/6786040/6219516
const groupDigits = (numberString: string) => {
  const str = numberString.split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  }
  return str.join(".");
};

interface NumberFormatOptions {
  significantDigits?: number;
  rounding?: Decimal.Rounding;
}

const formatDecimal = (value: number | Decimal, options?: NumberFormatOptions) => {
  const decimal = typeof value == "number" ? new Decimal(value) : value;
  const sd = options?.significantDigits ?? 6;
  const r = options?.rounding ?? Decimal.ROUND_HALF_UP;
  return decimal.toSignificantDigits(sd, r).toString();
};

export const prettyFormatNumber = (value: number | Decimal) => {
  return groupDigits(formatDecimal(value));
};
