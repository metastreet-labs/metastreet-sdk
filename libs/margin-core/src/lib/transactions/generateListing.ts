import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { Marketplace, TransactionParams } from "./types";

type GenerateListingParams = TransactionParams & {
  escrowID: string;
  marketplace: Marketplace;
  consideration: BigNumberish;
  startTime: BigNumberish;
  expiration: BigNumberish;
  salt: BigNumberish;
};

const _generateListing = async (params: GenerateListingParams) => {
  const { deployment, signer } = params;
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signer);
  return pePlatform.generateListing(
    params.escrowID,
    params.marketplace,
    params.consideration,
    params.startTime,
    params.expiration,
    params.salt
  );
};

export const generateListing = withReadableError(_generateListing);
