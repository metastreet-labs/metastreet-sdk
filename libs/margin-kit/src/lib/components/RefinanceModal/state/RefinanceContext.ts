import { GetCollateralLimitsResult, LeverageBuy } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { createContext } from "react";
import { TransactionState } from "../../../hooks/useTransactionState";
import { BWLToken } from "../../../types";
import { RefinanceFormState, UseRefinanceFormResult } from "./useRefinanceForm";
import { UseRefinanceTransactionResult } from "./useRefinanceTransaction";

interface RefinanceContextType {
  formState: RefinanceFormState;
  transactionState: TransactionState;
  actions: Pick<UseRefinanceFormResult, "setDebtFactor" | "setDuration"> &
    Pick<UseRefinanceTransactionResult, "refinance">;
  token: BWLToken;
  leverageBuy: LeverageBuy;
  limits: GetCollateralLimitsResult;
  flashFee: BigNumber;
}

export const RefinanceContext = createContext<RefinanceContextType | undefined>(undefined);
