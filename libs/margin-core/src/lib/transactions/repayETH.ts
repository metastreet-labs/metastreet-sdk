import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatform__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish, ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export interface RepayETHParams extends TransactionParams {
  escrowID: string;
  repayment: BigNumberish;
}

const _repayETH = async (params: RepayETHParams): Promise<ContractTransaction> => {
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatform__factory.connect(pePlatformAddress, params.signer);
  return pePlatform.repayETH(params.escrowID, { value: params.repayment });
};

export const repayETH = withReadableError(_repayETH);
