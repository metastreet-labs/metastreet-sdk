import {
  quoteRefinance,
  QuoteRefinanceParams,
  QuoteRefinanceResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useSignerOrProvider from "../../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export type UseQuoteRefinanceParams = Omit<QuoteRefinanceParams, "signerOrProvider" | "lbWrapperAddress">;

export const useQuoteRefinance = (params: UseQuoteRefinanceParams) => {
  const { signerOrProvider } = useSignerOrProvider();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return quoteRefinance({ ...params, signerOrProvider, lbWrapperAddress: deployment.lbWrapperAddress });
  });

  return useQuery<QuoteRefinanceResult, ReadableError>(
    useQuoteRefinanceQKs.loanTerms(params.vaultAddress, params),
    fetcher
  );
};

type TokenIdentifier = Pick<QuoteRefinanceParams, "collectionAddress" | "tokenID">;
type LoanTerms = TokenIdentifier & Pick<QuoteRefinanceParams, "balance" | "downPayment" | "duration">;

export const useQuoteRefinanceQKs = {
  all: () => ["quote-refinance"],
  vault: (vaultAddress: string) => [...useQuoteRefinanceQKs.all(), vaultAddress],
  token: (vaultAddress: string, token: TokenIdentifier) => [
    ...useQuoteRefinanceQKs.vault(vaultAddress),
    token.collectionAddress,
    token.tokenID,
  ],
  loanTerms: (vaultAddress: string, terms: LoanTerms) => {
    const { balance, downPayment, duration, ...token } = terms;
    const id = `${balance}-${downPayment}-${duration}`;
    return [...useQuoteRefinanceQKs.token(vaultAddress, token), id];
  },
};
