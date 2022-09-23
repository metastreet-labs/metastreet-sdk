import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import Decimal from "decimal.js";
import { LEVERAGE_BUY_WRAPPER_ADDRESS, VAULT_ADDRESS } from "../../env";
import { SignerOrProvider } from "./interfaces";

interface GetCollateralLimitsProps {
  collectionAddress: string;
  tokenID: string;
}

export interface CollateralLimits {
  minDuration: number;
  maxDuration: number;
  maxPrincipal: Decimal;
  collateralValue: Decimal;
  maxLoanToValue: Decimal;
}

const getCollateralLimits = async (
  sop: SignerOrProvider,
  props: GetCollateralLimitsProps
): Promise<CollateralLimits> => {
  const { collectionAddress, tokenID } = props;

  const leverageBuyWrapper = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, sop);

  const limits = await leverageBuyWrapper.getCollateralLimits(VAULT_ADDRESS, collectionAddress, tokenID);

  return {
    minDuration: Math.ceil(limits.minDuration / 86400),
    maxDuration: Math.floor(limits.maxDuration / 86400),
    maxPrincipal: new Decimal(limits.maxPrincipal.toString()),
    collateralValue: new Decimal(limits.collateralValue.toString()),
    maxLoanToValue: new Decimal(limits.maxLoanToValue.toString()),
  };
};

export default getCollateralLimits;
