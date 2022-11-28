import { getLeverageBuyEvents, LeverageBuyEvent, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import { useFetcherWithDeployment } from "../useFetcherWithDeployment";

export interface UseLeverageBuyEventsParams {
  skip?: number;
  first?: number;
}

export const useLeverageBuyEvents = (params: UseLeverageBuyEventsParams) => {
  const { skip = 0, first = 100 } = params;
  const { address: owner = "" } = useAccount();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getLeverageBuyEvents({ ...deployment, owner, skip, first });
  });

  return useQuery<LeverageBuyEvent[], ReadableError>(useLeverageBuyEventsQKs.page(owner, first, skip), fetcher, {
    enabled: Boolean(owner),
  });
};

export const useLeverageBuyEventsQKs = {
  all: () => ["leverage-buys"],
  owner: (owner: string) => [...useLeverageBuyEventsQKs.all(), owner],
  page: (owner: string, first: number, skip: number) => [...useLeverageBuyEventsQKs.owner(owner), { first, skip }],
};
