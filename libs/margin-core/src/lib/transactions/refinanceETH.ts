import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish, ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export interface RefinanceETHParams extends TransactionParams {
  escrowID: string;
  duration: number;
  downPayment: BigNumberish;
  maxRepayment: BigNumberish;
}

const _refinanceETH = (params: RefinanceETHParams): Promise<ContractTransaction> => {
  const { signer, deployment } = params;
  const contract = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const payable = BigNumber.from(params.downPayment).gt(0);
  return contract.refinanceETH(
    params.escrowID,
    deployment.vaultAddress,
    params.duration,
    params.downPayment,
    params.maxRepayment,
    { value: payable ? params.downPayment : undefined }
  );
};

export const refinanceETH = withReadableError(_refinanceETH);
