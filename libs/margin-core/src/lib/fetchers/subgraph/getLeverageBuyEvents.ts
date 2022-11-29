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

export type GetLeverageBuyEventsParams = { subgraphURI: string } & GetPayloadVariables;

export type GetLeverageBuyEventsResult = LeverageBuyEvent[];

export const getLeverageBuyEvents = async (params: GetLeverageBuyEventsParams): Promise<GetLeverageBuyEventsResult> => {
  const { subgraphURI, ...variables } = params;

  const response = await fetch(subgraphURI, {
    method: "POST",
    body: getPayload(variables),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const json = await response.json();
    if (json.data) {
      const rawEvents = json.data.leverageBuyEvents as RawLeverageBuyEvent[];
      return rawEvents.map(transformRawLeverageBuyEvent);
    } else if (json.errors) {
      throw json.errors;
    } else {
      throw new Error("Something wrong happened");
    }
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};
