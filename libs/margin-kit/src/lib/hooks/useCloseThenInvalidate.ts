import { useAccount, useClient } from "wagmi";
import { useLeverageBuyEventsQKs } from "../lib/hooks/fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../lib/hooks/fetchers/subgraph/useLeverageBuys";
import { useDeployment } from "./useDeployment";

export const useCloseThenInvalidate = (ogOnClose: () => void) => {
  const deployment = useDeployment();
  const { address } = useAccount();
  const { queryClient } = useClient();

  return () => {
    ogOnClose();
    if (deployment && address) {
      queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, address));
      queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, address));
    }
  };
};
