import { getLeverageBuys, LeverageBuy, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDeployment from "../../../../hooks/meta-street-config/useDeployment";
import useSignerAddress from "../../../../hooks/meta-street-config/useSignerAddress";
import { useFetcherWithDeployment } from "../useFetcherWithDeployment";

export const useLeverageBuys = () => {
  const owner = useSignerAddress() ?? "";
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
