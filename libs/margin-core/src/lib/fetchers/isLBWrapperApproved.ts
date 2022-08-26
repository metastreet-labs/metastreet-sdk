import {
  ERC721__factory,
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

interface IsLBWrapperApprovedParams extends FetcherParams {
  owner: string;
}

const _isLBWrapperApproved = async (params: IsLBWrapperApprovedParams) => {
  const { signerOrProvider, deployment } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();

  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signerOrProvider);
  const buyerNoteTokenAddress = await pePlatform.buyerNoteToken();

  const buyerNoteToken = ERC721__factory.connect(buyerNoteTokenAddress, signerOrProvider);
  return buyerNoteToken.isApprovedForAll(params.owner, deployment.lbWrapperAddress);
};

export const isLBWrapperApproved = withReadableError(_isLBWrapperApproved);
