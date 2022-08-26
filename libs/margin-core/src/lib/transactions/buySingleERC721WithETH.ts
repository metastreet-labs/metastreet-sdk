import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export interface BuySingleERC721WithETHParams extends TransactionParams {
  purchasePrice: BigNumberish;
  fillCallData: string;
  downPayment: BigNumberish;
  maxRepayment: BigNumberish;
  duration: number;
}

const _buySingleERC721WithETH = (params: BuySingleERC721WithETHParams) => {
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

export const buySingleERC721WithETH = withReadableError(_buySingleERC721WithETH);
