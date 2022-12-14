import { cancelListing, LeverageBuy, ListingData, waitForSubgraphSync } from "@metastreet-labs/margin-core";
import useDeployment from "../../../hooks/meta-street-config/useDeployment";
import useMetaStreetQueryClient from "../../../hooks/meta-street-config/useMetaStreetQueryClient";
import useSigner from "../../../hooks/meta-street-config/useSigner";
import { useLeverageBuyEventsQKs } from "../fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../fetchers/subgraph/useLeverageBuys";

export const useCancelListing = () => {
  const signer = useSigner();
  const deployment = useDeployment();
  const queryClient = useMetaStreetQueryClient();

  return async (leverageBuy: LeverageBuy & { listingData: ListingData }) => {
    if (!signer) throw new Error("repay called without a signer");
    if (!deployment) throw new Error("repay was called without a deployment");
    const tx = await cancelListing({
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
      escrowID: leverageBuy.escrowID,
      marketplace: leverageBuy.listingData.marketplace,
      listingData: leverageBuy.listingData.raw,
    });
    const receipt = await tx.wait(2);
    await waitForSubgraphSync({ subgraphURI: deployment.subgraphURI, blockNumber: receipt.blockNumber });
    const address = await signer.getAddress();
    queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, address));
    queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, address));
    return receipt;
  };
};
