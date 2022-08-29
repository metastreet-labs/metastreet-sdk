import {
  getLeverageBuyEvents,
  GetLeverageBuyEventsParams,
  GetLeverageBuyEventsResult,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

export interface UseLeverageBuyEventsParams extends Omit<GetLeverageBuyEventsParams, "deployment"> {
  queryOptions?: Parameters<typeof useQuery<GetLeverageBuyEventsResult, Error>>[2];
}

export const useLeverageBuyEvents = (params: UseLeverageBuyEventsParams) => {
  const { first, owner, skip, queryOptions } = params;

  const deployment = useDeployment();

  const fetcher = () => getLeverageBuyEvents({ deployment, first, owner, skip });

  return useQuery<GetLeverageBuyEventsResult, Error>(
    leverageBuyEventsQueryKeys.page({ owner, first, skip }),
    fetcher,
    queryOptions
  );
};

export const leverageBuyEventsQueryKeys = {
  all: () => ["leverage-buy-events"],
  owner: ({ owner }: Pick<UseLeverageBuyEventsParams, "owner">) => [...leverageBuyEventsQueryKeys.all(), owner],
  page: ({ first, skip, owner }: Pick<UseLeverageBuyEventsParams, "first" | "skip" | "owner">) => [
    ...leverageBuyEventsQueryKeys.owner({ owner }),
    { first, skip },
  ],
};
