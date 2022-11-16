import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatform__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export type RefinanceETHParams = TransactionParams & {
  escrowID: BigNumberish;
  duration: BigNumberish;
  downPayment: BigNumberish;
  maxRepayment: BigNumberish;
  vaultAddress: string;
};

const _refinanceETH = async (params: RefinanceETHParams) => {
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatform__factory.connect(pePlatformAddress, params.signer);

  const calldata = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint64", "int256", "uint256"],
    [params.vaultAddress, params.duration, params.downPayment, params.maxRepayment]
  );

  const payable = BigNumber.from(params.downPayment).gt(0);

  return pePlatform.transferAndCall(params.escrowID, params.lbWrapperAddress, calldata, {
    value: payable ? params.downPayment : undefined,
  });
};

export const refinanceETH = withReadableError(_refinanceETH);
