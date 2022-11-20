import {
  quoteRefinance,
  QuoteRefinanceParams,
  QuoteRefinanceResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export type UseQuoteRefinanceParams = Omit<QuoteRefinanceParams, "signerOrProvider" | "deployment">;

export const useQuoteRefinance = (params: UseQuoteRefinanceParams) => {
  const { provider } = useMetaStreetDeployment();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return quoteRefinance({ ...params, signerOrProvider: provider, deployment });
  });

  return useQuery<QuoteRefinanceResult, ReadableError>(
    quoteRefinanceQueryKeys.loanTerms(params.vaultAddress, params),
    fetcher,
    { enabled }
  );
};

type TokenIdentifier = Pick<QuoteRefinanceParams, "collectionAddress" | "tokenID">;
type LoanTerms = TokenIdentifier & Pick<QuoteRefinanceParams, "balance" | "downPayment" | "duration">;

const quoteRefinanceQueryKeys = {
  all: () => ["quote-refinance"],
  vault: (vaultAddress: string) => [...quoteRefinanceQueryKeys.all(), vaultAddress],
  token: (vaultAddress: string, token: TokenIdentifier) => [
    ...quoteRefinanceQueryKeys.vault(vaultAddress),
    token.collectionAddress,
    token.tokenID,
  ],
  loanTerms: (vaultAddress: string, terms: LoanTerms) => {
    const { balance, downPayment, duration, ...token } = terms;
    const id = `${balance}-${downPayment}-${duration}`;
    return [...quoteRefinanceQueryKeys.token(vaultAddress, token), id];
  },
};
