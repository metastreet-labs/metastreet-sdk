import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { BigNumber, BigNumberish } from "ethers";
import { withReadableError } from "../errors";
import { FetcherParams } from "./types";

export interface QuoteRefinanceParams extends FetcherParams {
  collectionAddress: string;
  tokenID: string;
  balance: BigNumberish;
  downPayment: BigNumberish;
  duration: number;
  vaultAddress: string;
}

export interface QuoteRefinanceResult {
  fee: BigNumber;
  principal: BigNumber;
  repayment: BigNumber;
}

const _quoteRefinance = async (params: QuoteRefinanceParams): Promise<QuoteRefinanceResult> => {
  const contract = LeverageBuyWrapperV1__factory.connect(params.lbWrapperAddress, params.signerOrProvider);
  const quote = await contract.quoteRefinance(
    params.balance,
    params.downPayment,
    params.collectionAddress,
    params.tokenID,
    params.vaultAddress,
    params.duration
  );
  return {
    fee: quote.fee,
    principal: quote.principal,
    repayment: quote.repayment,
  };
};

export const quoteRefinance = withReadableError(_quoteRefinance);
