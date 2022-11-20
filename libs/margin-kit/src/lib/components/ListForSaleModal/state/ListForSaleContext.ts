import { LeverageBuy } from "@metastreet-labs/margin-core";
import { createContext, useContext } from "react";
import { TransactionState } from "../../../hooks/useTransactionState";
import { ListForSaleFormActions, ListForSaleFormState } from "./useListForSaleForm";
import { UseListForSaleTransactionResult } from "./useListForSaleTransaction";

export interface ListForSaleContextType {
  formState: ListForSaleFormState;
  transactionState: TransactionState;
  actions: ListForSaleFormActions & Pick<UseListForSaleTransactionResult, "listForSale">;
  leverageBuy: LeverageBuy;
}

export const ListForSaleContext = createContext<ListForSaleContextType | undefined>(undefined);

export const useListForSale = () => {
  const context = useContext(ListForSaleContext);
  if (!context) throw new Error("useListForSale was used outside of a ListForSaleProvider");
  return context;
};
