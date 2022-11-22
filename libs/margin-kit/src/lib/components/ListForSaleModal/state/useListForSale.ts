import { useContext } from "react";
import { ListForSaleContext } from "./ListForSaleContext";

export const useListForSale = () => {
  const context = useContext(ListForSaleContext);
  if (!context) throw new Error("useListForSale was used outside of a ListForSaleProvider");
  return context;
};
