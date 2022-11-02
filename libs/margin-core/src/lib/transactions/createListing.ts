import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatform__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { TransactionParams } from "./types";

type CreateListingParams = TransactionParams & {
  escrowID: BigNumberish;
  marketplace: BigNumberish;
  listingPrice: BigNumberish;
  feeBasisPoints: BigNumberish;
  feeRecipient: string;
  royaltyBasisPoints: BigNumberish;
  royaltyRecipient: string;
  startTimestamp: BigNumberish;
  endTimestamp: BigNumberish;
  salt: BigNumberish;
};

const createListing = async (params: CreateListingParams) => {
  const { deployment, signer } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatform__factory.connect(pePlatformAddress, signer);
  return pePlatform.createListing(
    params.escrowID,
    params.marketplace,
    params.listingPrice,
    params.feeBasisPoints,
    params.feeRecipient,
    params.royaltyBasisPoints,
    params.royaltyRecipient,
    params.startTimestamp,
    params.endTimestamp,
    params.salt
  );
};

export default createListing;
