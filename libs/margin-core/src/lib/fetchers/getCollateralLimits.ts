import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber } from "ethers";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

export interface GetCollateralLimitsParams extends FetcherParams {
  collectionAddress: string;
  tokenID: string;
  vaultAddress: string;
}

export interface GetCollateralLimitsResult {
  minDuration: number;
  maxDuration: number;
  maxPrincipal: BigNumber;
  collateralValue: BigNumber;
  maxLoanToValue: BigNumber;
}

const _getCollateralLimits = async (params: GetCollateralLimitsParams): Promise<GetCollateralLimitsResult> => {
  const { signerOrProvider, lbWrapperAddress, collectionAddress, tokenID, vaultAddress } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, signerOrProvider);
  const limits = await lbWrapper.getCollateralLimits(vaultAddress, collectionAddress, tokenID);

  return {
    minDuration: limits.minDuration,
    maxDuration: limits.maxDuration,
    maxPrincipal: limits.maxPrincipal,
    collateralValue: limits.collateralValue,
    maxLoanToValue: limits.maxLoanToValue,
  };
};

export const getCollateralLimits = withReadableError(_getCollateralLimits);
