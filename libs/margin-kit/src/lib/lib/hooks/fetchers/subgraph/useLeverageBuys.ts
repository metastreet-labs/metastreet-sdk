import { getLeverageBuys, LeverageBuy, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import { useFetcherWithDeployment } from "../useFetcherWithDeployment";

export const useLeverageBuys = () => {
  const { address: owner = "" } = useAccount();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getLeverageBuys({ ...deployment, owner, skip: 0, first: 1000 });
  });

  return useQuery<LeverageBuy[], ReadableError>(useLeverageBuysQKs.owner(owner), fetcher, {
    enabled: Boolean(owner),
  });
};

export const useLeverageBuysQKs = {
  all: () => ["leverage-buys"],
  owner: (owner: string) => [...useLeverageBuysQKs.all(), owner],
};
