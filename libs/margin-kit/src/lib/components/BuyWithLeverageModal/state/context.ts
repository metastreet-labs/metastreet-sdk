import Decimal from "decimal.js";
import { TransactionState } from "meta-street/hooks/useTransactionState";
import { CollateralLimits } from "meta-street/lib/fetchers/getCollateralLimits";
import { BWLToken } from "meta-street/types";
import { createContext } from "react";
import { BuyWithLeverageFormState } from "./useBuyWithLeverageForm";

export type BuyWithLeverageContextType = {
  formState: BuyWithLeverageFormState;
  transactionState: TransactionState;
  actions: {
    setDebtFactor: (debtFactor: number) => void;
    setDuration: (duration: number) => void;
    buy: () => void;
  };
  tokens: BWLToken[];
  limits: CollateralLimits;
  flashFee: Decimal;
};

export const BuyWithLeverageContext = createContext<BuyWithLeverageContextType | undefined>(undefined);
