import { getLeverageBuys, LeverageBuy, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useLeverageBuys = () => {
  const { address: owner = "" } = useAccount();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return getLeverageBuys({ deployment, owner, skip: 0, first: 1000 });
  });

  return useQuery<LeverageBuy[], ReadableError>(leverageBuysQueryKeys.owner(owner), fetcher, {
    enabled: Boolean(enabled && owner),
  });
};

const leverageBuysQueryKeys = {
  all: () => ["leverage-buys"],
  owner: (owner: string) => [...leverageBuysQueryKeys.all(), owner],
};
