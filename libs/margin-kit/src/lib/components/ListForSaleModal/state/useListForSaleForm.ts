import { LeverageBuy } from "@metastreet-labs/margin-core";
import { useState } from "react";
import { fromUnits } from "../../../utils/numbers";
import useListingParams from "./useListingParams";

export interface ListForSaleFormState {
  listingPrice: number;
  listingPriceError?: string;
  formSubmitted: boolean;
}

export interface ListForSaleFormActions {
  setListingPrice: (price: number) => void;
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

  const minListingPrice = fromUnits(minListingPriceUnits).toNumber();
  const [listingPrice, setListingPrice] = useState(minListingPrice);
  const [formSubmitted, setFormSubmitted] = useState(false);

  let listingPriceError: string | undefined;
  if (isNaN(listingPrice)) listingPriceError = "Invalid listing price";
  else if (listingPrice < minListingPrice) listingPriceError = "Listing price is below the minimum";

  return {
    formState: { listingPrice, listingPriceError, formSubmitted },
    formActions: { setListingPrice, setFormSubmitted },
  };
};
