import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { withReadableError } from "../errors";
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

const _getCollateralLimits = async (params: GetCollateralLimitsParams): Promise<GetCollateralLimitsResult> => {
  const { signerOrProvider, deployment, collectionAddress, tokenID, purchasePrice } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const limits = await lbWrapper.getCollateralLimits(deployment.vaultAddress, collectionAddress, tokenID);

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

export const getCollateralLimits = withReadableError(_getCollateralLimits);
