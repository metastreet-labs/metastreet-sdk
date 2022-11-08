import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

export interface QuoteMultipleERC721Params extends FetcherParams {
  purchasePrices: BigNumberish[];
  downPayments: BigNumberish[];
  collectionAddresses: string[];
  tokenIDs: string[];
  duration: number;
  vaultAddress: string;
}

export interface QuoteMultipleERC721Result {
  repayments: BigNumber[];
  fee: BigNumber;
  principals: BigNumber[];
}

const _quoteMultipleERC721 = async (params: QuoteMultipleERC721Params): Promise<QuoteMultipleERC721Result> => {
  const { signerOrProvider, deployment } = params;
  const leverageBuyWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const quote = await leverageBuyWrapper.quoteMultipleERC721(
    params.purchasePrices,
    params.downPayments,
    params.collectionAddresses,
    params.tokenIDs,
    params.vaultAddress,
    params.duration
  );
  return {
    repayments: quote.repayments,
    fee: quote.fee,
    principals: quote.principals,
  };
};

export const quoteMultipleERC721 = withReadableError(_quoteMultipleERC721);
