import Decimal from "decimal.js";
import { LEVERAGE_BUY_WRAPPER_ADDRESS, VAULT_ADDRESS } from "meta-street/env";
import { LeverageBuyWrapperV1__factory } from "types/ethers-contracts";
import { SignerOrProvider } from "./interfaces";

type GetCollateralLimitsProps = {
  collectionAddress: string;
  tokenID: string;
};

export type CollateralLimits = {
  minDuration: number;
  maxDuration: number;
  maxPrincipal: Decimal;
  collateralValue: Decimal;
  maxLoanToValue: Decimal;
};

const getCollateralLimits = async (
  sop: SignerOrProvider,
  props: GetCollateralLimitsProps
): Promise<CollateralLimits> => {
  const { collectionAddress, tokenID } = props;

  const leverageBuyWrapper = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, sop);

  const limits = await leverageBuyWrapper.getCollateralLimits(VAULT_ADDRESS, collectionAddress, tokenID);

  return {
    minDuration: Math.ceil(limits.minDuration.toNumber() / 86400),
    maxDuration: Math.floor(limits.maxDuration.toNumber() / 86400),
    maxPrincipal: new Decimal(limits.maxPrincipal.toString()),
    collateralValue: new Decimal(limits.collateralValue.toString()),
    maxLoanToValue: new Decimal(limits.maxLoanToValue.toString()),
  };
};

export default getCollateralLimits;
