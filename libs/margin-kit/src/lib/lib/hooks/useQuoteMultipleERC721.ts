import Decimal from "decimal.js";
import { BigNumberish } from "ethers";
import { useProvider, useQuery } from "wagmi";
import { BWLToken } from "../../types";
import { getReadableError } from "../../utils/errors";
import { toUnits } from "../../utils/numbers";
import quoteMultipleERC721, { QuoteMultipleERC721Result } from "../fetchers/quoteMultipleERC721";

export interface UseQuoteMultipleERC721Props {
  tokens: BWLToken[];
  downPayments: Decimal[];
  duration: number;
}

const useQuoteMultipleERC721 = (props: UseQuoteMultipleERC721Props) => {
  const provider = useProvider();

  const fetcher = () => {
    const collectionAddresses = new Array<string>();
    const tokenIDs = new Array<string>();
    const purchasePrices = new Array<BigNumberish>();
    const downPayments = new Array<BigNumberish>();

    for (let i = 0; i < props.tokens.length; i++) {
      const token = props.tokens[i];
      collectionAddresses.push(token.collectionAddress);
      tokenIDs.push(token.tokenID);
      purchasePrices.push(toUnits(token.tokenPrice).toString());
      downPayments.push(props.downPayments[i].toString());
    }

    return quoteMultipleERC721(provider, {
      purchasePrices,
      downPayments,
      collectionAddresses,
      tokenIDs,
      duration: props.duration * 86400,
    });
  };

  const { data, error } = useQuery<QuoteMultipleERC721Result, Error>(
    quoteMultipleERC721QueryKeys.withParams(props),
    fetcher
  );

  return { quote: data, quoteError: error && getReadableError(error) };
};

export const quoteMultipleERC721QueryKeys = {
  all: () => ["quote-multiple-erc721"],
  tokens: (tokens: BWLToken[]) => {
    const id = tokens.map((token) => token.tokenID).join("-");
    return [...quoteMultipleERC721QueryKeys.all(), id];
  },
  withParams: (params: { tokens: BWLToken[]; downPayments: Decimal[]; duration: number }) => {
    const id = `${params.downPayments.join("-")}-${params.duration}`;
    return [...quoteMultipleERC721QueryKeys.tokens(params.tokens), id];
  },
};

export default useQuoteMultipleERC721;
