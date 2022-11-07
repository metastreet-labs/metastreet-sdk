import { GetCollateralLimitsResult, QuoteMultipleERC721Result } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { BWLToken } from "../../../types";
import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, toUnitsBigNum } from "../../../utils/numbers";
import useDebouncedQuote from "./useDebouncedQuote";

export interface BuyWithLeverageFormState {
  debtFactor: number;
  debtAmount: number;
  downPayments: BigNumber[];
  totalDownPayment: number;
  duration: number;
  quote?: QuoteMultipleERC721Result;
  totalRepayment?: number;
}

interface UseBuyWithLeverageFormProps {
  tokens: BWLToken[];
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
}

interface UseBuyWithLeverageFormResult {
  formState: BuyWithLeverageFormState;
  setDebtFactor: (debtFactor: number) => void;
  setDuration: (duration: number) => void;
}

const useBuyWithLeverageForm = (props: UseBuyWithLeverageFormProps): UseBuyWithLeverageFormResult => {
  const { tokens, limits, flashFee } = props;
  // state
  const [debtFactor, setDebtFactor] = useState(0.05);
  const [duration, setDuration] = useState(daysFromSeconds(limits.minDuration) || 1);

  // derived state
  const { debtAmount, downPayments, totalDownPayment } = useMemo(() => {
    const purchasePrices = tokens.map((token) => toUnitsBigNum(token.tokenPrice));

    const downPayments = purchasePrices.map((price, idx) => {
      const debtFactorPercent = Math.ceil(debtFactor * 100);
      let downPayment = price.sub(limits.maxPrincipal.mul(debtFactorPercent).div(100));
      if (idx == 0) downPayment = downPayment.add(flashFee);
      return downPayment.isNegative() ? BigNumber.from(0) : downPayment;
    });

    let debtAmount = BigNumber.from(0);
    for (let i = 0; i < purchasePrices.length; i++) {
      const tokenDebt = purchasePrices[i].sub(downPayments[i]);
      debtAmount = debtAmount.add(tokenDebt);
    }

    const totalDownPayment = fromUnits(
      downPayments.reduce((total, downPayment) => total.add(downPayment), BigNumber.from(0))
    ).toNumber();

    return { debtAmount, downPayments, totalDownPayment };
  }, [debtFactor, flashFee, limits.maxPrincipal, tokens]);

  const { quote } = useDebouncedQuote({
    tokens: props.tokens,
    downPayments,
    duration,
  });

  // more derived state
  const totalRepayment = useMemo(() => {
    const repayments = quote?.repayments;
    if (!repayments) return undefined;
    return fromUnits(repayments.reduce((total, repayment) => total.add(repayment), BigNumber.from(0))).toNumber();
  }, [quote]);

  return {
    formState: {
      debtFactor,
      duration,
      downPayments,
      debtAmount: fromUnits(debtAmount).toNumber(),
      quote,
      totalDownPayment,
      totalRepayment,
    },
    setDebtFactor,
    setDuration,
  };
};

export default useBuyWithLeverageForm;
