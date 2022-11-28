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
          listingData {
            listingPrice
            consideration
            totalFees
            marketplace
            raw
          }
        }
      }`,
    variables,
  };
  return JSON.stringify(payload);
};

export type GetLeverageBuysParams = { subgraphURI: string } & GetPayloadVariables;

export type GetLeverageBuysResult = LeverageBuy[];

export const getLeverageBuys = async (params: GetLeverageBuysParams): Promise<LeverageBuy[]> => {
  const { subgraphURI, ...variables } = params;

  const response = await fetch(subgraphURI, {
    method: "POST",
    body: getPayload(variables),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const json = await response.json();
    if (json.data) {
      const rawEntities = json.data.leverageBuys as RawLeverageBuy[];
      return rawEntities.map(transformRawLeverageBuy);
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
