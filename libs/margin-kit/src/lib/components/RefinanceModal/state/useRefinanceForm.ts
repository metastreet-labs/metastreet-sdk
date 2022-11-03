import { GetCollateralLimitsResult, QuoteRefinanceResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { BWLToken } from "../../../types";
import { daysFromSeconds } from "../../../utils/dates";
import useDebouncedQuoteRefinance from "./useDebouncedQuoteRefinance";

export interface RefinanceFormState {
  // state
  debtFactor: number;
  duration: number;
  // derived
  debtAmount: BigNumber;
  downPayment: BigNumber;
  // fetched
  quote?: QuoteRefinanceResult;
}

interface UseRefinanceFormParams {
  token: BWLToken;
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
  oldRepayment: BigNumber;
}

export interface UseRefinanceFormResult {
  formState: RefinanceFormState;
  setDebtFactor: (debtFactor: number) => void;
  setDuration: (duration: number) => void;
}

const getInitialDebtFactor = (oldRepayment: BigNumber, maxDebt: BigNumber) => {
  const initialDebt = oldRepayment.gt(maxDebt) ? maxDebt : oldRepayment;
  return initialDebt.div(maxDebt).toNumber();
};

const useRefinanceForm = (params: UseRefinanceFormParams): UseRefinanceFormResult => {
  const { token, limits, flashFee, oldRepayment } = params;

  const maxDebt = useMemo(() => limits.maxPrincipal.sub(flashFee), [limits, flashFee]);

  const [debtFactor, setDebtFactor] = useState(getInitialDebtFactor(oldRepayment, maxDebt));
  const [duration, setDuration] = useState(daysFromSeconds(limits.minDuration));

  const { debtAmount, downPayment } = useMemo(() => {
    const debtAmount = maxDebt.mul(debtFactor * 100).div(100);
    const downPayment = oldRepayment.sub(debtAmount);
    return { debtAmount, downPayment };
  }, [debtFactor, maxDebt, oldRepayment]);

  const { quote } = useDebouncedQuoteRefinance({
    ...token,
    balance: oldRepayment,
    downPayment,
    duration,
  });

  return {
    formState: {
      // state
      debtFactor,
      duration,
      // derived
      debtAmount,
      downPayment,
      // fetched
      quote,
    },
    setDebtFactor,
    setDuration,
  };
};

export default useRefinanceForm;
