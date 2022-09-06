import { getLeverageBuys, GetLeverageBuysParams, GetLeverageBuysResult } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDeployment from "../DeploymentContext/useDeployment";

export interface UseLeverageBuysParams extends Omit<GetLeverageBuysParams, "deployment"> {
  queryOptions?: Parameters<typeof useQuery<GetLeverageBuysResult, Error>>[2];
}

export const useLeverageBuys = (params: UseLeverageBuysParams) => {
  const { first, owner, skip, queryOptions } = params;

  const { deployment } = useDeployment();

  const fetcher = () =>
    getLeverageBuys({
      deployment,
      first,
      owner,
      skip,
    });

  return useQuery<GetLeverageBuysResult, Error>(
    leverageBuysQueryKeys.page({ owner, first, skip }),
    fetcher,
    queryOptions
  );
};

export const leverageBuysQueryKeys = {
  all: () => ["leverage-buys"],
  owner: ({ owner }: Pick<UseLeverageBuysParams, "owner">) => [...leverageBuysQueryKeys.all(), owner],
  page: ({ first, skip, owner }: Pick<UseLeverageBuysParams, "owner" | "first" | "skip">) => [
    ...leverageBuysQueryKeys.owner({ owner }),
    { first, skip },
  ],
};
