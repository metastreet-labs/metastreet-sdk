import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { FetcherParams } from "./types";

export interface GetCollateralLimitsParams extends FetcherParams {
  collectionAddress: string;
  tokenID: string;
  purchasePrice: BigNumberish;
}

export interface GetCollateralLimitsResult {
  minDuration: number;
  maxDuration: number;
  maxPrincipal: BigNumber;
  collateralValue: BigNumber;
  maxLoanToValue: BigNumber;
}

export const getCollateralLimits = async ({
  signerOrProvider,
  collectionAddress,
  tokenID,
  purchasePrice,
  deployment: { lbWrapperAddress, vaultAddress },
}: GetCollateralLimitsParams): Promise<GetCollateralLimitsResult> => {
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
