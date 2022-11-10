import { LeverageBuy, QuoteRefinanceResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VaultLimits } from "../../../lib/hooks/useVaultsLimits";
import { daysFromSeconds, daysToSeconds } from "../../../utils/dates";
import useDebouncedQuoteRefinance from "./useDebouncedQuoteRefinance";

export interface RefinanceFormState {
  // state
  debtFactor: number;
  duration: number;
  activeLimits: VaultLimits;
  // derived
  debtAmount: BigNumber;
  downPayment: BigNumber;
  // fetched
  quote?: QuoteRefinanceResult;
}

interface UseRefinanceFormParams {
  leverageBuy: LeverageBuy;
  limits: VaultLimits[];
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
  const maxPrincipal = limits[limits.length - 1].maxPrincipal;

  const maxDebt = useMemo(() => maxPrincipal.sub(flashFee), [maxPrincipal, flashFee]);

  // state
  const [activeLimits, setActiveLimits] = useState(limits[0]);
  const [debtFactor, setDebtFactor] = useState(getInitialDebtFactor(balance, maxDebt));
  const [duration, setDuration] = useState(daysFromSeconds(activeLimits.minDuration, "up"));

  // derived
  const { debtAmount, downPayment } = useMemo(() => {
    const debtAmount = maxDebt.mul(Math.ceil(debtFactor * 100)).div(100);
    const downPayment = balance.sub(debtAmount);
    return { debtAmount, downPayment };
  }, [debtFactor, maxDebt, balance]);

  /* set active vault limits based on the selected debt amount */
  useEffect(() => {
    const limit = limits.find((l) => l.maxPrincipal.gte(debtAmount));
    if (!limit) throw Error("active vault limit is undefined, should never happen");
    setActiveLimits(limit);
  }, [debtAmount, limits]);

  /* make sure duration is not out of bounds when the active vault limits change */
  useEffect(() => {
    const minDuration = daysFromSeconds(activeLimits.minDuration, "up");
    const maxDuration = daysFromSeconds(activeLimits.maxDuration);
    if (duration < minDuration) setDuration(minDuration);
    else if (duration > maxDuration) setDuration(maxDuration);
  }, [activeLimits, duration]);

  const { quote } = useDebouncedQuoteRefinance({
    ...leverageBuy,
    balance,
    downPayment,
    duration: daysToSeconds(duration),
    vaultAddress: activeLimits.vaultAddress,
  });

  return {
    formState: {
      // state
      debtFactor,
      duration,
      activeLimits,
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
