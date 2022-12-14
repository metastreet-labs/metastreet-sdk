import { LeverageBuyWrapperV1__factory } from "@metastreet-labs/pe-contracts-typechain";
import { FetcherParams } from "../types";
import { transformRawLeverageBuy } from "./transformers";
import { LeverageBuy } from "./types";

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
          listingData {
            listingPrice
            consideration
            totalFees
            marketplace
            raw
          }
        }
      }
    `,
    variables: { id },
  };
  return JSON.stringify(payload);
};

interface GetLeverageBuyParams extends FetcherParams {
  subgraphURI: string;
  escrowID: string;
}

export const getLeverageBuy = async (params: GetLeverageBuyParams): Promise<LeverageBuy> => {
  const { signerOrProvider, escrowID, lbWrapperAddress, subgraphURI } = params;

  const lbWrapper = LeverageBuyWrapperV1__factory.connect(lbWrapperAddress, signerOrProvider);
  const pePlatformAddress = await lbWrapper.purchaseEscrow();
  const id = `${lbWrapperAddress}-${pePlatformAddress}-${escrowID}`.toLowerCase();

  const response = await fetch(subgraphURI, {
    method: "POST",
    body: getPayload(id),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const json = await response.json();
    const raw = json.data.leverageBuy;
    if (raw) return transformRawLeverageBuy(raw);
    throw new Error("not found");
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};
