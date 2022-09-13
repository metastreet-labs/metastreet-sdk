import { quoteRefinance, QuoteRefinanceParams, QuoteRefinanceResult } from "@metastreet-labs/margin-core";
import { useProvider, useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

type TokenIdentifier = Pick<QuoteRefinanceParams, "collectionAddress" | "tokenID">;

export interface UseQuoteRefinanceParams extends Omit<QuoteRefinanceParams, "deployment" | "signerOrProvider"> {
  queryOptions?: Parameters<typeof useQuery<QuoteRefinanceResult, Error>>[2];
}

export const useQuoteRefinance = (params: UseQuoteRefinanceParams) => {
  const { collectionAddress, tokenID, balance, downPayment, duration, queryOptions } = params;

  const provider = useProvider();
  const { deployment } = useDeployment();

  const fetcher = () =>
    quoteRefinance({
      signerOrProvider: provider,
      deployment,
      collectionAddress,
      tokenID,
      balance,
      downPayment,
      duration,
    });

  return useQuery<QuoteRefinanceResult, Error>(
    quoteRefinanceQueryKeys.refinance({ collectionAddress, tokenID, balance, downPayment, duration }),
    fetcher,
    queryOptions
  );
};

export const quoteRefinanceQueryKeys = {
  all: () => ["quote-refinance"],
  collection: ({ collectionAddress }: Pick<TokenIdentifier, "collectionAddress">) => [
    ...quoteRefinanceQueryKeys.all(),
    collectionAddress,
  ],
  token: ({ collectionAddress, tokenID }: TokenIdentifier) => [
    ...quoteRefinanceQueryKeys.collection({ collectionAddress }),
    tokenID,
  ],
  refinance: ({
    collectionAddress,
    tokenID,
    balance,
    downPayment,
    duration,
  }: Omit<UseQuoteRefinanceParams, "queryOptions">) => [
    ...quoteRefinanceQueryKeys.token({ collectionAddress, tokenID }),
    { balance, downPayment, duration },
  ],
};
