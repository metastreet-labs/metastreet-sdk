import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-sdk/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { Deployment } from "../deployments";
import { SignerOrProvider } from "../types";

export interface CreateGetCollateralLimitsParams {
  signerOrProvider: SignerOrProvider;
  deployment: Deployment;
  collectionAddress: string;
  tokenID: string;
  purchasePrice: BigNumberish;
}

export interface CreateGetCollateralLimitsResult {
  minDuration: number;
  maxDuration: number;
  maxPrincipal: BigNumber;
  collateralValue: BigNumber;
  maxLoanToValue: BigNumber;
}

export function createGetCollateralLimits({
  signerOrProvider,
  collectionAddress,
  tokenID,
  purchasePrice,
  deployment: { lbWrapperAddress, vaultAddress },
}: CreateGetCollateralLimitsParams) {
  return async () => {
    const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, signerOrProvider);
    const limits = await lbWrapper.getCollateralLimits(vaultAddress, collectionAddress, tokenID);

    const flashLenderAddress = await lbWrapper.flashLender();
    const wethAddress = await lbWrapper.weth();

    const flashLender = IERC3156FlashLender__factory.connect(flashLenderAddress, signerOrProvider);

    const flashFee = await flashLender.flashFee(wethAddress, purchasePrice);

    return {
      minDuration: limits.minDuration,
      maxDuration: limits.maxDuration,
      maxPrincipal: limits.maxPrincipal.sub(flashFee),
      collateralValue: limits.collateralValue,
      maxLoanToValue: limits.maxLoanToValue,
    };
  };
}
