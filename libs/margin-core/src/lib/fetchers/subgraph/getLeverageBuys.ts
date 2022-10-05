import { Deployment } from "../../deployments";
import { RawLeverageBuy, transformRawLeverageBuy } from "./transformers";
import { LeverageBuy } from "./types";

interface GetPayloadVariables {
  owner: string;
  skip: number;
  first: number;
}

const getPayload = (variables: GetPayloadVariables) => {
  const payload = {
    operationName: "LeverageBuys",
    query: `query LeverageBuys($owner: String!, $first: Int!, $skip: Int!) {
        leverageBuys(
          where: {buyer: $owner, status: Active}
          orderBy: maturity
          orderDirection: asc
          first: $first
          skip: $skip
        ) {
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
          listingData
        }
      }`,
    variables,
  };
  return JSON.stringify(payload);
};

export type GetLeverageBuysParams = { deployment: Deployment } & GetPayloadVariables;

export type GetLeverageBuysResult = LeverageBuy[];

export const getLeverageBuys = async (params: GetLeverageBuysParams): Promise<LeverageBuy[]> => {
  const {
    deployment: { subgraphURI },
    ...variables
  } = params;

  const response = await fetch(subgraphURI, {
    method: "POST",
    body: getPayload(variables),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const json = await response.json();
    const rawEvents = json.data.leverageBuys as RawLeverageBuy[];
    return rawEvents.map(transformRawLeverageBuy);
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};
