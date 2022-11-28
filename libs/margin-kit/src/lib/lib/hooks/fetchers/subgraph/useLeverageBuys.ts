import { getLeverageBuys, LeverageBuy, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import { useDeployment } from "../../../../hooks/useDeployment";
import { useFetcherWithDeployment } from "../useFetcherWithDeployment";

export const useLeverageBuys = () => {
  const { address: owner = "" } = useAccount();
  const deployment = useDeployment();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getLeverageBuys({ ...deployment, owner, skip: 0, first: 1000 });
  });

  return useQuery<LeverageBuy[], ReadableError>(
    useLeverageBuysQKs.owner(deployment?.subgraphURI ?? "", owner),
    fetcher,
    { enabled: Boolean(owner) }
  );
};

export const useLeverageBuysQKs = {
  all: () => ["leverage-buys"],
  subgraph: (subgraphURI: string) => [...useLeverageBuysQKs.all(), subgraphURI],
  owner: (subgraphURI: string, owner: string) => [...useLeverageBuysQKs.subgraph(subgraphURI), owner],
};
