import { LeverageBuy, repayETH, waitForSubgraphSync } from "@metastreet-labs/margin-core";
import useDeployment from "../../../hooks/meta-street-config/useDeployment";
import useMetaStreetQueryClient from "../../../hooks/meta-street-config/useMetaStreetQueryClient";
import useSigner from "../../../hooks/meta-street-config/useSigner";
import { useLeverageBuyEventsQKs } from "../fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../fetchers/subgraph/useLeverageBuys";

export const useRepayETH = () => {
  const signer = useSigner();
  const deployment = useDeployment();
  const queryClient = useMetaStreetQueryClient();

  return async (leverageBuy: LeverageBuy) => {
    if (!signer) throw new Error("repay called without a signer");
    if (!deployment) throw new Error("repay was called without a deployment");
    const tx = await repayETH({
      escrowID: leverageBuy.escrowID,
      repayment: leverageBuy.repayment,
      signer,
      lbWrapperAddress: deployment.lbWrapperAddress,
    });
    const receipt = await tx.wait(2);
    await waitForSubgraphSync({ blockNumber: receipt.blockNumber, subgraphURI: deployment.subgraphURI });
    const owner = await signer.getAddress();
    queryClient.invalidateQueries(useLeverageBuysQKs.owner(deployment.subgraphURI, owner));
    queryClient.invalidateQueries(useLeverageBuyEventsQKs.owner(deployment.subgraphURI, owner));
    return receipt;
  };
};
