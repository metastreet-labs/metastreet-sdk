import { getLeverageBuyEvents, LeverageBuyEvent, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import { useDeployment } from "../../../../hooks/useDeployment";
import { useFetcherWithDeployment } from "../useFetcherWithDeployment";

export interface UseLeverageBuyEventsParams {
  skip?: number;
  first?: number;
}

export const useLeverageBuyEvents = (params: UseLeverageBuyEventsParams) => {
  const { skip = 0, first = 100 } = params;
  const { address: owner = "" } = useAccount();
  const deployment = useDeployment();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getLeverageBuyEvents({ ...deployment, owner, skip, first });
  });

  return useQuery<LeverageBuyEvent[], ReadableError>(
    useLeverageBuyEventsQKs.page(deployment?.subgraphURI ?? "", owner, first, skip),
    fetcher,
    { enabled: Boolean(owner) }
  );
};

export const useLeverageBuyEventsQKs = {
  all: () => ["leverage-buys"],
  subgraph: (subgraphURI: string) => [...useLeverageBuyEventsQKs.all(), subgraphURI],
  owner: (subgraphURI: string, owner: string) => [...useLeverageBuyEventsQKs.subgraph(subgraphURI), owner],
  page: (subgraphURI: string, owner: string, first: number, skip: number) => [
    ...useLeverageBuyEventsQKs.owner(subgraphURI, owner),
    { first, skip },
  ],
};
