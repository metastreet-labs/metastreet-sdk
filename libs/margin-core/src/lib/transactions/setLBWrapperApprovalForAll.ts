import {
  IERC721Metadata__factory,
  LeverageBuyWrapperV1__factory,
  PurchaseEscrowPlatformV1__factory,
} from "@metastreet-labs/pe-contracts-typechain";
import { ContractTransaction } from "ethers";
import { withReadableError } from "../errors";
import { TransactionParams } from "./types";

export type SetLBWrapperApprovalForAllParams = TransactionParams;

const _setLBWrapperApprovalForAll = async (params: SetLBWrapperApprovalForAllParams): Promise<ContractTransaction> => {
  const {
    signer,
    deployment: { lbWrapperAddress },
  } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, signer);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();

  const pePlatform = PurchaseEscrowPlatformV1__factory.connect(pePlatformAddress, signer);
  const buyerNoteTokenAddress = await pePlatform.buyerNoteToken();

  const erc721 = IERC721Metadata__factory.connect(buyerNoteTokenAddress, signer);
  return erc721.setApprovalForAll(lbWrapperAddress, true);
};

export const setLBWrapperApprovalForAll = withReadableError(_setLBWrapperApprovalForAll);
