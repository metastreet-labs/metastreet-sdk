import Decimal from "decimal.js";
import { ReactNode } from "react";
import { CollateralLimits } from "../../../lib/fetchers/getCollateralLimits";
import { BWLToken } from "../../../types";
import { BuyWithLeverageContext, BuyWithLeverageContextType } from "./context";
import useBuyWithLeverageForm from "./useBuyWithLeverageForm";
import useBuyWithLeverageTransaction from "./useBuyWithLeverageTransaction";

interface BuyWithLeverageProviderProps {
  children: ReactNode;
  tokens: BWLToken[];
  limits: CollateralLimits;
  flashFee: Decimal;
  onBuySuccess?: () => void;
}

const BuyWithLeverageProvider = (props: BuyWithLeverageProviderProps) => {
  const { tokens, children, limits, flashFee, onBuySuccess } = props;
  const { formState, ...formActions } = useBuyWithLeverageForm({
    tokens,
    limits,
    flashFee,
  });
  const { transactionState, buy } = useBuyWithLeverageTransaction({
    tokens,
    formState,
    onBuySuccess,
  });

  const contextValue: BuyWithLeverageContextType = {
    formState,
    transactionState,
    actions: { ...formActions, buy },
    tokens,
    limits,
    flashFee,
  };

  return <BuyWithLeverageContext.Provider value={contextValue}>{children}</BuyWithLeverageContext.Provider>;
};

export default BuyWithLeverageProvider;
