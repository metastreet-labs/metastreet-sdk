import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber } from "ethers";
import { TransactionParams } from "./types";

interface RefinanceETHParams extends TransactionParams {
  escrowID: string;
  duration: number;
  downPayment: string;
  maxRepayment: string;
}

const refinanceETH = (params: RefinanceETHParams) => {
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

export default refinanceETH;
