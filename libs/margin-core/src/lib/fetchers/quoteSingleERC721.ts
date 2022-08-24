import { LeverageBuyWrapperV1__factory } from "@metastreet-sdk/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
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

const quoteSingleERC721 = async (params: QuoteSingleERC721Params): Promise<QuoteSingleERC721Result> => {
  const { signerOrProvider, deployment } = params;
  const leverageBuyWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const quote = await leverageBuyWrapper.quoteSingleERC721(
    params.purchasePrice,
    params.downPayment,
    params.collectionAddress,
    params.tokenID,
    deployment.lbWrapperAddress,
    params.duration
  );
  return {
    repayment: quote.repayment,
    fee: quote.fee,
    principal: quote.principal,
  };
};

export default quoteSingleERC721;