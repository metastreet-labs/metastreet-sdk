import {
  ERC721__factory,
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { FetcherParams } from "./types";

interface IsLBWrapperApprovedParams extends FetcherParams {
  owner: string;
}

const isLBWrapperApproved = async (params: IsLBWrapperApprovedParams) => {
  const { signerOrProvider, deployment } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();

  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signerOrProvider);
  const buyerNoteTokenAddress = await pePlatform.buyerNoteToken();

  const buyerNoteToken = ERC721__factory.connect(buyerNoteTokenAddress, signerOrProvider);
  return buyerNoteToken.isApprovedForAll(params.owner, deployment.lbWrapperAddress);
};

export default isLBWrapperApproved;
