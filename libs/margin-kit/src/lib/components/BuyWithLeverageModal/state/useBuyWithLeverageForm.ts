import { QuoteMultipleERC721Result } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VaultLimits } from "../../../lib/hooks/useVaultsLimits";
import { BWLToken } from "../../../types";
import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, toUnitsBigNum } from "../../../utils/numbers";
import useDebouncedQuote from "./useDebouncedQuote";

export interface BuyWithLeverageFormState {
  debtFactor: number;
  debtAmount: number;
  activeLimits: VaultLimits;
  downPayments: BigNumber[];
  totalDownPayment: number;
  duration: number;
  quote?: QuoteMultipleERC721Result;
  totalRepayment?: number;
}

interface UseBuyWithLeverageFormProps {
  tokens: BWLToken[];
  limits: VaultLimits[];
  flashFee: BigNumber;
}

interface UseBuyWithLeverageFormResult {
  formState: BuyWithLeverageFormState;
  setDebtFactor: (debtFactor: number) => void;
  setDuration: (duration: number) => void;
}

const useBuyWithLeverageForm = (props: UseBuyWithLeverageFormProps): UseBuyWithLeverageFormResult => {
  const { tokens, limits, flashFee } = props;
  const maxPrincipal = limits[limits.length - 1].maxPrincipal;

  // state
  const [debtFactor, setDebtFactor] = useState(0.05);

  // derived
  const { debtAmount, downPayments, totalDownPayment, activeLimits } = useMemo(() => {
    const purchasePrices = tokens.map((token) => toUnitsBigNum(token.tokenPrice));

    const downPayments = purchasePrices.map((price, idx) => {
      const debtFactorPercent = Math.ceil(debtFactor * 100);
      let downPayment = price.sub(maxPrincipal.mul(debtFactorPercent).div(100));
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

    const activeLimits = limits.find((l) => l.maxPrincipal.sub(flashFee).gte(debtAmount));
    if (!activeLimits) throw Error("active vault limit is undefined, should never happen");

    return { debtAmount, downPayments, totalDownPayment, activeLimits };
  }, [debtFactor, flashFee, maxPrincipal, tokens, limits]);

  // state
  const [duration, setDuration] = useState(daysFromSeconds(activeLimits.minDuration, "up"));

  /* make sure duration is not out of bounds when the active vault limits change */
  useEffect(() => {
    const minDuration = daysFromSeconds(activeLimits.minDuration, "up");
    const maxDuration = daysFromSeconds(activeLimits.maxDuration);
    if (duration < minDuration) setDuration(minDuration);
    else if (duration > maxDuration) setDuration(maxDuration);
  }, [activeLimits, duration]);

  const { quote } = useDebouncedQuote({
    tokens: props.tokens,
    downPayments,
    duration,
    vaultAddress: activeLimits.vaultAddress,
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
      activeLimits,
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
