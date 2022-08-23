import { LeverageBuyWrapperV1__factory } from "@metastreet-sdk/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { TransactionParams } from "./types";

export interface BuySingleERC721WithETHParams extends TransactionParams {
  purchasePrice: BigNumberish;
  fillCallData: string;
  downPayment: BigNumberish;
  maxRepayment: BigNumberish;
  duration: number;
}

export const buySingleERC721WithETH = async (params: BuySingleERC721WithETHParams) => {
  const { signer, deployment } = params;
  const contract = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  return contract.buySingleERC721WithETH(
    params.purchasePrice,
    params.fillCallData,
    deployment.vaultAddress,
    params.duration,
    params.maxRepayment,
    { value: params.downPayment }
  );
};
