import Decimal from "decimal.js";
import { createContext } from "react";
import { TransactionState } from "../../../hooks/useTransactionState";
import { CollateralLimits } from "../../../lib/fetchers/getCollateralLimits";
import { BWLToken } from "../../../types";
import { BuyWithLeverageFormState } from "./useBuyWithLeverageForm";

export interface BuyWithLeverageContextType {
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
}

export const BuyWithLeverageContext = createContext<BuyWithLeverageContextType | undefined>(undefined);
