import { LeverageBuy } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { toUnits } from "../../../utils/numbers";
import { useFees } from "../FeesProvider";

interface UseListingProceedsParams {
  leverageBuy: LeverageBuy;
  listingPrice: number;
}

const useListingProceeds = (params: UseListingProceedsParams) => {
  const { leverageBuy, listingPrice } = params;
  const { repayment, downPayment } = leverageBuy;
  const fees = useFees();
  const inputPrice = BigNumber.from(toUnits(listingPrice).toString());

  const proceeds = inputPrice
    .mul(10000 - fees.opensea.bps - fees.royalty.bps)
    .div(10000)
    .sub(repayment);
  const netProfit = proceeds.sub(downPayment);

  return { proceeds, netProfit };
};

export default useListingProceeds;
