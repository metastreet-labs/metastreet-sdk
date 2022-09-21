import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export interface BuyMultipleERC721WithETHParams extends TransactionParams {
  purchasePrices: BigNumberish[];
  fillCallDatas: string[];
  downPayments: BigNumberish[];
  maxRepayments: BigNumberish[];
  duration: number;
}

const _buyMultipleERC721WithETH = (params: BuyMultipleERC721WithETHParams): Promise<ContractTransaction> => {
  const { signer, deployment } = params;
  const contract = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const totalDownPayment = params.downPayments.reduce(
    (total, downPayment) => BigNumber.from(total).add(downPayment),
    0
  );
  return contract.buyMultipleERC721WithETH(
    params.purchasePrices,
    params.fillCallDatas,
    deployment.vaultAddress,
    params.duration,
    params.downPayments,
    params.maxRepayments,
    { value: totalDownPayment }
  );
};

export const buyMultipleERC721WithETH = withReadableError(_buyMultipleERC721WithETH);