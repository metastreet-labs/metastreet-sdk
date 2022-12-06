import { useLeverageBuyEventsQKs } from "../lib/hooks/fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../lib/hooks/fetchers/subgraph/useLeverageBuys";
import useDeployment from "./meta-street-config/useDeployment";
import useMetaStreetQueryClient from "./meta-street-config/useMetaStreetQueryClient";
import useSignerAddress from "./meta-street-config/useSignerAddress";

export const useCloseThenInvalidate = (ogOnClose: () => void) => {
  const deployment = useDeployment();
  const address = useSignerAddress();
  const queryClient = useMetaStreetQueryClient();

  return () => {
    ogOnClose();
    if (deployment && address) {
      queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, address));
      queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, address));
    }
  };
};
