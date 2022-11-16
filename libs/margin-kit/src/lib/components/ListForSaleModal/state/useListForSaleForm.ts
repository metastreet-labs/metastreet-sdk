import { LeverageBuy } from "@metastreet-labs/margin-core";
import Decimal from "decimal.js";
import { useState } from "react";
import { fromUnits } from "../../../utils/numbers";
import useListingParams from "./useListingParams";

export interface ListForSaleFormState {
  listingPrice: string;
  listingPriceNum: number;
  listingPriceError?: string;
  formSubmitted: boolean;
}

export interface ListForSaleFormActions {
  setListingPrice: (price: string) => void;
  setFormSubmitted: (submitted: boolean) => void;
}

interface UseListForSaleFormResult {
  formState: ListForSaleFormState;
  formActions: ListForSaleFormActions;
}

interface UseListForSaleFormParams {
  leverageBuy: LeverageBuy;
}

export const useListForSaleForm = (params: UseListForSaleFormParams): UseListForSaleFormResult => {
  const { leverageBuy } = params;
  const { minListingPrice: minListingPriceUnits } = useListingParams(leverageBuy);

  const minListingPrice = fromUnits(minListingPriceUnits, Decimal.ROUND_UP).toNumber();

  // state
  const [listingPrice, setListingPrice] = useState(minListingPrice.toString());
  const [formSubmitted, setFormSubmitted] = useState(false);

  // derived
  const listingPriceNum = parseFloat(listingPrice) || 0;
  let listingPriceError: string | undefined;
  if (isNaN(listingPriceNum)) listingPriceError = "Invalid listing price";
  else if (listingPriceNum < minListingPrice) listingPriceError = "Listing price is below the minimum";

  return {
    formState: { listingPrice, listingPriceNum, listingPriceError, formSubmitted },
    formActions: { setListingPrice, setFormSubmitted },
  };
};
