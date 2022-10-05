import { GetCollateralLimitsResult } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { createContext } from "react";
import { TransactionState } from "../../../hooks/useTransactionState";
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
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
}

export const BuyWithLeverageContext = createContext<BuyWithLeverageContextType | undefined>(undefined);
