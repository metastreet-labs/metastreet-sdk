import {
  quoteRefinance,
  QuoteRefinanceParams,
  QuoteRefinanceResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

export type UseQuoteRefinanceParams = Omit<QuoteRefinanceParams, "signerOrProvider" | "deployment">;

export const useQuoteRefinance = (params: UseQuoteRefinanceParams) => {
  const { deployment, provider } = useDefinedMetaStreetDeployment();
  return useQuery<QuoteRefinanceResult, ReadableError>(quoteRefinanceQueryKeys.loanTerms(params), () =>
    quoteRefinance({ ...params, signerOrProvider: provider, deployment })
  );
};

type TokenIdentifier = Pick<QuoteRefinanceParams, "collectionAddress" | "tokenID">;
type LoanTerms = TokenIdentifier & Pick<QuoteRefinanceParams, "balance" | "downPayment" | "duration">;

const quoteRefinanceQueryKeys = {
  all: () => ["quote-refinance"],
  token: (token: TokenIdentifier) => [...quoteRefinanceQueryKeys.all(), token.collectionAddress, token.tokenID],
  loanTerms: (terms: LoanTerms) => {
    const { balance, downPayment, duration, ...token } = terms;
    const id = `${balance}-${downPayment}-${duration}`;
    return [...quoteRefinanceQueryKeys.token(token), id];
  },
};
