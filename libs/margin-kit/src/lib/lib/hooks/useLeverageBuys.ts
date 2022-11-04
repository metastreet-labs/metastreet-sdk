import { getLeverageBuys, LeverageBuy, ReadableError } from "@metastreet-labs/margin-core";
import { useAccount, useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";

export const useLeverageBuys = () => {
  const { deployment } = useMetaStreetDeployment();
  const { address: owner = "" } = useAccount();

  const fetcher = () => {
    if (!deployment) throw new Error("unsupported chain");
    return getLeverageBuys({ deployment, owner, skip: 0, first: 1000 });
  };

  return useQuery<LeverageBuy[], ReadableError>(leverageBuysQueryKeys.owner(owner), fetcher);
};

const leverageBuysQueryKeys = {
  all: () => ["leverage-buys"],
  owner: (owner: string) => [...leverageBuysQueryKeys.all(), owner],
};
