import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { FetcherParams } from "./types";

const getPayload = (id: string) => {
  const payload = {
    operationName: "LeverageBuy",
    query: `
      query LeverageBuy($id: ID!) {
        leverageBuy(id: $id) {
          id
          escrowId
          status
          token
          tokenId
          tokenURI
          purchasePrice
          downpayment
          principal
          repayment
          duration
          maturity 
        }
      }
    `,
    variables: { id },
  };
  return JSON.stringify(payload);
};

interface GetLeverageBuyParams extends FetcherParams {
  escrowID: string;
}

export const getLeverageBuy = async (params: GetLeverageBuyParams) => {
  const { signerOrProvider, deployment, escrowID } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(deployment.lbWrapperAddress, signerOrProvider);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const id = `${deployment.lbWrapperAddress}-${pePlatformAddress}-${escrowID}`.toLowerCase();

  const response = await fetch(params.deployment.subgraphURI, {
    method: "POST",
    body: getPayload(id),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  // TODO: transform response into a LeverageBuyEntity
};
