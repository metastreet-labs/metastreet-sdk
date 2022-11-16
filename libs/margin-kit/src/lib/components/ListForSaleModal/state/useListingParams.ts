import { LeverageBuy } from "@metastreet-labs/margin-core";
import { BigNumber } from "ethers";
import { useFees } from "../FeesProvider";

export default function useListingParams(leverageBuy: LeverageBuy) {
  const { repayment, downPayment } = leverageBuy;

  const fees = useFees();

  const applyFees = (value: BigNumber) => {
    return value.mul(10000).div(10000 - fees.opensea.bps - fees.royalty.bps);
  };

  const minListingPrice = applyFees(repayment);
  const floorBreakeven = applyFees(downPayment.add(repayment));

  return { minListingPrice, floorBreakeven };
}
