import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatform__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { BigNumberish } from "ethers";
import { withReadableError } from "../errors";
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

const _createListing = async (params: CreateListingParams) => {
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatform__factory.connect(pePlatformAddress, params.signer);
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

export const createListing = withReadableError(_createListing);
