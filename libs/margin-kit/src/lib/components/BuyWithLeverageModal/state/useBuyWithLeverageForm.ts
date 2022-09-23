import Decimal from "decimal.js";
import { useMemo, useState } from "react";
import { CollateralLimits } from "../../../lib/fetchers/getCollateralLimits";
import { QuoteMultipleERC721Result } from "../../../lib/fetchers/quoteMultipleERC721";
import { BWLToken } from "../../../types";
import { fromUnits, toUnits } from "../../../utils/numbers";
import useDebouncedQuote from "./useDebouncedQuote";

export interface BuyWithLeverageFormState {
  debtFactor: number;
  debtAmount: number;
  downPayments: Decimal[];
  totalDownPayment: number;
  duration: number;
  quote?: QuoteMultipleERC721Result;
  totalRepayment?: number;
}

interface UseBuyWithLeverageFormProps {
  tokens: BWLToken[];
  limits: CollateralLimits;
  flashFee: Decimal;
}

const useBuyWithLeverageForm = (props: UseBuyWithLeverageFormProps) => {
  const { tokens, limits, flashFee } = props;
  // state
  const [debtFactor, setDebtFactor] = useState(0.05);
  const [duration, setDuration] = useState(limits.minDuration);

  // derived state
  const { debtAmount, downPayments, totalDownPayment } = useMemo(() => {
    const purchasePrices = tokens.map((token) => toUnits(token.tokenPrice));

    const downPayments = purchasePrices.map((price, idx) => {
      let downPayment = price.sub(limits.maxPrincipal.mul(debtFactor));
      if (idx == 0) downPayment = downPayment.add(flashFee);
      return Decimal.max(downPayment, 0);
    });

    let debtAmount = new Decimal(0);
    for (let i = 0; i < purchasePrices.length; i++) {
      const tokenDebt = purchasePrices[i].sub(downPayments[i]);
      debtAmount = debtAmount.add(tokenDebt);
    }

    const totalDownPayment = fromUnits(
      downPayments.reduce((total, downPayment) => total.add(downPayment), new Decimal(0))
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
    return fromUnits(repayments.reduce((total, repayment) => total.add(repayment), new Decimal(0))).toNumber();
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
