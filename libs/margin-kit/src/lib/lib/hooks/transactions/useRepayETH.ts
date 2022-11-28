import { LeverageBuy, repayETH, waitForSubgraphSync } from "@metastreet-labs/margin-core";
import { useClient, useSigner } from "wagmi";
import { useDeployment } from "../../../hooks/useDeployment";
import { useLeverageBuyEventsQKs } from "../fetchers/subgraph/useLeverageBuyEvents";
import { useLeverageBuysQKs } from "../fetchers/subgraph/useLeverageBuys";

export const useRepayETH = () => {
  const { data: signer } = useSigner();
  const deployment = useDeployment();
  const { queryClient } = useClient();

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
