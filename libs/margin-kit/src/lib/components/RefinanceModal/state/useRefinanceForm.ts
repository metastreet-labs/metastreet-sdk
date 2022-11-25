import { LeverageBuy, QuoteRefinanceResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VaultLimits } from "../../../lib/hooks/fetchers/useVaultsLimits";
import { daysFromSeconds, daysToSeconds } from "../../../utils/dates";
import useDebouncedQuoteRefinance from "./useDebouncedQuoteRefinance";

export interface RefinanceFormState {
  // state
  debtFactor: number;
  duration: number;
  // derived
  debtAmount: BigNumber;
  downPayment: BigNumber;
  activeLimits: VaultLimits;
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
  let initialDebtFactor = initialDebt.div(maxDebt).toNumber();
  if (initialDebtFactor < 0.05) initialDebtFactor = 0.05;
  return initialDebtFactor;
};

const useRefinanceForm = (params: UseRefinanceFormParams): UseRefinanceFormResult => {
  const { leverageBuy, limits, flashFee } = params;
  const balance = leverageBuy.repayment;
  const maxPrincipal = limits[limits.length - 1].maxPrincipal;

  const maxDebt = useMemo(() => maxPrincipal.sub(flashFee), [maxPrincipal, flashFee]);

  // state
  const [debtFactor, setDebtFactor] = useState(getInitialDebtFactor(balance, maxDebt));

  // derived
  const { debtAmount, downPayment, activeLimits } = useMemo(() => {
    const debtAmount = maxDebt.mul(Math.ceil(debtFactor * 100)).div(100);
    const downPayment = balance.sub(debtAmount);
    const activeLimits = limits.find((l) => l.maxPrincipal.sub(flashFee).gte(debtAmount));
    if (!activeLimits) throw Error("active vault limit is undefined, should never happen");
    return { debtAmount, downPayment, activeLimits };
  }, [debtFactor, maxDebt, balance, limits, flashFee]);

  // state
  const [duration, setDuration] = useState(daysFromSeconds(activeLimits.minDuration, "up"));

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
      // derived
      debtAmount,
      downPayment,
      activeLimits,
      // fetched
      quote,
    },
    setDebtFactor,
    setDuration,
  };
};

export default useRefinanceForm;
