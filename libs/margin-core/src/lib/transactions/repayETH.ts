import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { TransactionParams } from "./types";

interface RepayETHParams extends TransactionParams {
  escrowID: string;
  repayment: BigNumberish;
}

const repayETH = async (params: RepayETHParams) => {
  const { deployment, signer } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();

  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signer);
  return pePlatform.repayETH(params.escrowID, { value: params.repayment });
};

export default repayETH;
