import { cancelListing, LeverageBuy, ListingData, waitForSubgraphSync } from "@metastreet-labs/margin-core";
import { useClient, useSigner } from "wagmi";
import useDeployment from "../../../hooks/useDeployment";
import { useLeverageBuyEventsQKs } from "../fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../fetchers/subgraph/useLeverageBuys";

export const useCancelListing = () => {
  const { data: signer } = useSigner();
  const deployment = useDeployment();
  const { queryClient } = useClient();

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
    queryClient.invalidateQueries(useLeverageBuysQKs.owner(address));
    queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(address));
    return receipt;
  };
};
