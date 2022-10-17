import { Deployment } from "../../deployments";
import { RawLeverageBuyEvent, transformRawLeverageBuyEvent } from "./transformers";
import { LeverageBuyEvent } from "./types";

interface GetPayloadVariables {
  owner: string;
  skip: number;
  first: number;
}

const getPayload = (variables: GetPayloadVariables) => {
  const payload = {
    operationName: "LeverageBuyEvents",
    query: `
      query LeverageBuyEvents($owner: String!, $first: Int!, $skip: Int!) {
        leverageBuyEvents(
          where: { owner: $owner }
          orderBy: timestamp
          orderDirection: desc
          first: $first
          skip: $skip
        ) {
          id
          type
          timestamp
          leverageBuy {
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
          previousLeverageBuy {
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
      }
    `,
    variables,
  };
  return JSON.stringify(payload);
};

export type GetLeverageBuyEventsParams = { deployment: Deployment } & GetPayloadVariables;

export type GetLeverageBuyEventsResult = LeverageBuyEvent[];

export const getLeverageBuyEvents = async (params: GetLeverageBuyEventsParams): Promise<GetLeverageBuyEventsResult> => {
  const { deployment, ...variables } = params;

  const response = await fetch(deployment.subgraphURI, {
    method: "POST",
    body: getPayload(variables),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const json = await response.json();
    const rawEvents = json.data.leverageBuyEvents as RawLeverageBuyEvent[];
    return rawEvents.map(transformRawLeverageBuyEvent);
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};
