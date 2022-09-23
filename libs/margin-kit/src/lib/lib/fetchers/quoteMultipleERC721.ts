import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import { LEVERAGE_BUY_WRAPPER_ADDRESS, VAULT_ADDRESS } from "../../env";
import { SignerOrProvider } from "./interfaces";

export interface QuoteMultipleERC721Props {
  purchasePrices: BigNumberish[];
  downPayments: BigNumberish[];
  collectionAddresses: string[];
  tokenIDs: string[];
  duration: number;
}

export interface QuoteMultipleERC721Result {
  fee: Decimal;
  principals: Decimal[];
  repayments: Decimal[];
}

const quoteMultipleERC721 = async (
  sop: SignerOrProvider,
  props: QuoteMultipleERC721Props
): Promise<QuoteMultipleERC721Result> => {
  const contract = LeverageBuyWrapperV1__factory.connect(LEVERAGE_BUY_WRAPPER_ADDRESS, sop);
  const quote = await contract.quoteMultipleERC721(
    props.purchasePrices,
    props.downPayments,
    props.collectionAddresses,
    props.tokenIDs,
    VAULT_ADDRESS,
    props.duration
  );

  return {
    fee: new Decimal(quote.fee.toString()),
    principals: quote.principals.map((p) => new Decimal(p.toString())),
    repayments: quote.repayments.map((r) => new Decimal(r.toString())),
  };
};

export default quoteMultipleERC721;
