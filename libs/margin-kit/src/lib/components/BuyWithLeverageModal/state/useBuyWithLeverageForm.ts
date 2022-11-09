import { QuoteMultipleERC721Result } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { VaultLimit } from "../../../lib/hooks/useVaultsLimits";
import { BWLToken } from "../../../types";
import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, toUnitsBigNum } from "../../../utils/numbers";
import useDebouncedQuote from "./useDebouncedQuote";

export interface BuyWithLeverageFormState {
  debtFactor: number;
  debtAmount: number;
  activeVaultLimits: VaultLimit;
  downPayments: BigNumber[];
  totalDownPayment: number;
  duration: number;
  quote?: QuoteMultipleERC721Result;
  totalRepayment?: number;
}

interface UseBuyWithLeverageFormProps {
  tokens: BWLToken[];
  limits: VaultLimit[];
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
  const [activeVaultLimits, setActiveLimit] = useState(limits[0]);
  const [debtFactor, setDebtFactor] = useState(0.05);
  const [duration, setDuration] = useState(daysFromSeconds(limits[0].minDuration, "up"));

  // derived state
  const { debtAmount, downPayments, totalDownPayment } = useMemo(() => {
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

    return { debtAmount, downPayments, totalDownPayment };
  }, [debtFactor, flashFee, maxPrincipal, tokens]);

  /* set active vault limits based on the selected debt amount */
  useEffect(() => {
    const limit = limits.find((l) => l.maxPrincipal.gte(debtAmount));
    if (!limit) throw Error("active vault limit is undefined, should never happen");
    setActiveLimit(limit);
  }, [debtAmount, limits]);

  /* make sure duration is not out of bounds when the active vault limits change */
  useEffect(() => {
    const minDuration = daysFromSeconds(activeVaultLimits.minDuration, "up");
    const maxDuration = daysFromSeconds(activeVaultLimits.maxDuration);
    if (duration < minDuration) setDuration(minDuration);
    else if (duration > maxDuration) setDuration(maxDuration);
  }, [activeVaultLimits, duration]);

  const { quote } = useDebouncedQuote({
    tokens: props.tokens,
    downPayments,
    duration,
    vaultAddress: activeVaultLimits.vaultAddress,
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
      activeVaultLimits,
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
