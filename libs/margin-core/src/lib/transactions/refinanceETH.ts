import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

interface RefinanceETHParams extends TransactionParams {
  escrowID: string;
  duration: number;
  downPayment: string;
  maxRepayment: string;
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
