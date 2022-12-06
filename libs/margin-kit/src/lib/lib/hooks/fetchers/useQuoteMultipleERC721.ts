import { quoteMultipleERC721, QuoteMultipleERC721Result, ReadableError } from "@metastreet-labs/margin-core";
import { BigNumberish } from "ethers";
import { useMetaStreetQuery } from "../../../components/MetaStreetConfig/MetaStreetQueryClientProvider";
import useChainID from "../../../hooks/meta-street-config/useChainID";
import useSignerOrProvider from "../../../hooks/meta-street-config/useSignerOrProvider";
import { BWLToken } from "../../../types";
import { toUnits } from "../../../utils/numbers";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export interface UseQuoteMultipleERC721Props {
  tokens: BWLToken[];
  downPayments: BigNumberish[];
  duration: number;
  vaultAddress: string;
}

const useQuoteMultipleERC721 = (props: UseQuoteMultipleERC721Props) => {
  const chainID = useChainID();
  const { signerOrProvider } = useSignerOrProvider();

  const fetcher = useFetcherWithDeployment((deployment) => {
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
      signerOrProvider,
      lbWrapperAddress: deployment.lbWrapperAddress,
      purchasePrices,
      downPayments,
      collectionAddresses,
      tokenIDs,
      duration: props.duration * 86400,
      vaultAddress: props.vaultAddress,
    });
  });

  return useMetaStreetQuery<QuoteMultipleERC721Result, ReadableError>(
    useQuoteMultipleERC721QKs.withParams(chainID, props),
    fetcher
  );
};

export const useQuoteMultipleERC721QKs = {
  all: (chainID: number) => ["quote-multiple-erc721", chainID],
  tokens: (chainID: number, tokens: BWLToken[]) => {
    const id = tokens.map((token) => token.tokenID).join("-");
    return [...useQuoteMultipleERC721QKs.all(chainID), id];
  },
  withParams: (chainID: number, params: { tokens: BWLToken[]; downPayments: BigNumberish[]; duration: number }) => {
    const id = `${params.downPayments.join("-")}-${params.duration}`;
    return [...useQuoteMultipleERC721QKs.tokens(chainID, params.tokens), id];
  },
};

export default useQuoteMultipleERC721;
