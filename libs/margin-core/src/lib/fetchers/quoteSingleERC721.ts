import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

export interface QuoteSingleERC721Params extends FetcherParams {
  purchasePrice: BigNumberish;
  downPayment: BigNumberish;
  collectionAddress: string;
  tokenID: string;
  duration: number;
}

export interface QuoteSingleERC721Result {
  repayment: BigNumber;
  fee: BigNumber;
  principal: BigNumber;
}

const _quoteSingleERC721 = async (params: QuoteSingleERC721Params): Promise<QuoteSingleERC721Result> => {
  const leverageBuyWrapper = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signerOrProvider);
  const quote = await leverageBuyWrapper.quoteSingleERC721(
    params.purchasePrice,
    params.downPayment,
    params.collectionAddress,
    params.tokenID,
    params.lbWrapperAddress,
    params.duration
  );
  return {
    repayment: quote.repayment,
    fee: quote.fee,
    principal: quote.principal,
  };
};

export const quoteSingleERC721 = withReadableError(_quoteSingleERC721);
