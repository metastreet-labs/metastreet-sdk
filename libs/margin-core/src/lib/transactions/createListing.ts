import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { Marketplace, TransactionParams } from "./types";

type CreateListingParams = TransactionParams & {
  escrowID: string;
  marketplace: Marketplace;
  consideration: BigNumberish;
  expiration: BigNumberish;
  salt: BigNumberish;
  signature: string;
};

const _createListing = async (params: CreateListingParams) => {
  const { deployment, signer } = params;
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signer);
  return pePlatform.createListing(
    params.escrowID,
    params.marketplace,
    params.consideration,
    params.expiration,
    params.salt,
    params.signature
  );
};

export const createListing = withReadableError(_createListing);
