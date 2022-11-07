import { GetCollateralLimitsResult, LeverageBuy, QuoteRefinanceResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
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
  leverageBuy: LeverageBuy;
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
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
  const { leverageBuy, limits, flashFee } = params;
  const balance = leverageBuy.repayment;

  const maxDebt = useMemo(() => limits.maxPrincipal.sub(flashFee), [limits, flashFee]);

  const [debtFactor, setDebtFactor] = useState(getInitialDebtFactor(balance, maxDebt));
  const [duration, setDuration] = useState(daysFromSeconds(limits.minDuration) || 1);

  const { debtAmount, downPayment } = useMemo(() => {
    const debtAmount = maxDebt.mul(Math.ceil(debtFactor * 100)).div(100);
    const downPayment = balance.sub(debtAmount);
    return { debtAmount, downPayment };
  }, [debtFactor, maxDebt, balance]);

  const { quote } = useDebouncedQuoteRefinance({
    ...leverageBuy,
    balance,
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
