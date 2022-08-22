import { IERC3156FlashLender__factory, LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-lib";
import { BigNumberish } from "ethers";
import { Deployment } from "../deployments";
import { SignerOrProvider } from "../types";

interface Params {
  sop: SignerOrProvider;
  deployment: Deployment;
  collectionAddress: string;
  tokenID: string;
  purchasePrice: BigNumberish;
}

export function createGetCollateralLimits({
  sop,
  collectionAddress,
  tokenID,
  purchasePrice,
  deployment: { lbWrapperAddress, vaultAddress },
}: Params) {
  return async () => {
    const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, sop);
    const limits = await lbWrapper.getCollateralLimits(vaultAddress, collectionAddress, tokenID);

    const flashLenderAddress = await lbWrapper.flashLender();
    const wethAddress = await lbWrapper.weth();

    const flashLender = IERC3156FlashLender__factory.connect(flashLenderAddress, sop);

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
