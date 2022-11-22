import { LeverageBuy } from "@metastreet-labs/margin-core";
import { PropsWithChildren } from "react";
import { ListForSaleContext, ListForSaleContextType } from "./ListForSaleContext";
import { useListForSaleForm } from "./useListForSaleForm";
import { useListForSaleTransaction, UseListForSaleTransactionParams } from "./useListForSaleTransaction";

type ListForSaleProviderProps = PropsWithChildren & {
  leverageBuy: LeverageBuy;
  postOrderToOpenSea: UseListForSaleTransactionParams["postOrderToOpenSea"];
};

export const ListForSaleProvider = (props: ListForSaleProviderProps) => {
  const { children, leverageBuy, postOrderToOpenSea } = props;
  const { formState, formActions } = useListForSaleForm({ leverageBuy });
  const { transactionState, listForSale } = useListForSaleTransaction({
    formState,
    formActions,
    escrowID: leverageBuy.escrowID,
    postOrderToOpenSea,
  });

  const contextValue: ListForSaleContextType = {
    formState,
    transactionState,
    actions: { ...formActions, listForSale },
    leverageBuy,
  };

  return <ListForSaleContext.Provider value={contextValue}>{children}</ListForSaleContext.Provider>;
};
