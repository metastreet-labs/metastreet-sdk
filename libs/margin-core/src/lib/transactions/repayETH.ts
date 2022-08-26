import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish, ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

interface RepayETHParams extends TransactionParams {
  escrowID: string;
  repayment: BigNumberish;
}

const _repayETH = async (params: RepayETHParams): Promise<ContractTransaction> => {
  const { deployment, signer } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();

  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signer);
  return pePlatform.repayETH(params.escrowID, { value: params.repayment });
};

export const repayETH = withReadableError(_repayETH);
