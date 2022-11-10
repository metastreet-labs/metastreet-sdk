import { LeverageBuy } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { createContext } from "react";
import { TransactionState } from "../../../hooks/useTransactionState";
import { RefinanceFormState, UseRefinanceFormResult } from "./useRefinanceForm";
import { UseRefinanceTransactionResult } from "./useRefinanceTransaction";

export interface RefinanceContextType {
  formState: RefinanceFormState;
  transactionState: TransactionState;
  actions: Pick<UseRefinanceFormResult, "setDebtFactor" | "setDuration"> &
    Pick<UseRefinanceTransactionResult, "refinance">;
  leverageBuy: LeverageBuy;
  flashFee: BigNumber;
}

const RefinanceContext = createContext<RefinanceContextType | undefined>(undefined);

export default RefinanceContext;
