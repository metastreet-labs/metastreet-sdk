import { quoteMultipleERC721, QuoteMultipleERC721Result, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumberish } from "ethers";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";
import { BWLToken } from "../../types";
import { toUnits } from "../../utils/numbers";

export interface UseQuoteMultipleERC721Props {
  tokens: BWLToken[];
  downPayments: BigNumberish[];
  duration: number;
  vaultAddress: string;
}

const useQuoteMultipleERC721 = (props: UseQuoteMultipleERC721Props) => {
  const { provider, deployment, chainID } = useDefinedMetaStreetDeployment();

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

    return quoteMultipleERC721({
      signerOrProvider: provider,
      deployment,
      purchasePrices,
      downPayments,
      collectionAddresses,
      tokenIDs,
      duration: props.duration * 86400,
      vaultAddress: props.vaultAddress,
    });
  };

  return useQuery<QuoteMultipleERC721Result, ReadableError>(
    quoteMultipleERC721QueryKeys.withParams(chainID, props),
    fetcher
  );
};

export const quoteMultipleERC721QueryKeys = {
  all: (chainID: number) => ["quote-multiple-erc721", chainID],
  tokens: (chainID: number, tokens: BWLToken[]) => {
    const id = tokens.map((token) => token.tokenID).join("-");
    return [...quoteMultipleERC721QueryKeys.all(chainID), id];
  },
  withParams: (chainID: number, params: { tokens: BWLToken[]; downPayments: BigNumberish[]; duration: number }) => {
    const id = `${params.downPayments.join("-")}-${params.duration}`;
    return [...quoteMultipleERC721QueryKeys.tokens(chainID, params.tokens), id];
  },
};

export default useQuoteMultipleERC721;
