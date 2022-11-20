import {
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatform__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { withReadableError } from "../errors";
import { Marketplace } from "../fetchers/subgraph/types";
import { TransactionParams } from "./types";

type CancelListingParams = TransactionParams & {
  escrowID: string;
  marketplace: Marketplace;
  listingData: string;
};

const _cancelListing = async (params: CancelListingParams) => {
  const lbWrapper = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const pePlatform = PurchaseEscrowPlatform__factory.connect(pePlatformAddress, params.signer);
  return pePlatform.cancelListing(params.escrowID, params.marketplace, params.listingData);
};

export const cancelListing = withReadableError(_cancelListing);
