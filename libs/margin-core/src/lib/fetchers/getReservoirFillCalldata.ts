import { withReadableError } from "../errors";

interface GetReservoirFillCalldataProps {
  lbWrapperAddress: string;
  reservoirURL: string;
  collectionAddress: string;
  tokenID: string;
  apiKey?: string;
}

const _getReservoirFillCalldata = async (props: GetReservoirFillCalldataProps): Promise<string> => {
  const { lbWrapperAddress, reservoirURL, collectionAddress, tokenID, apiKey } = props;

  // request url
  const url = `${reservoirURL}/execute/buy/v7`;
  // post request body
  const body = {
    items: [{ token: `${collectionAddress}:${tokenID}` }],
    skipBalanceCheck: true,
    taker: lbWrapperAddress,
    excludeEOA: true,
  };

  // if api key was passed, add it to the headers
  const headers: Record<string, string> = {
    accept: "*/*",
    "content-type": "application/json",
  };
  if (apiKey) headers["x-api"] = apiKey;

  // send the request
  const response = await fetch(url, { method: "POST", body: JSON.stringify(body), headers });
  if (response.ok) {
    const json = await response.json();
    return json.steps[0].items[0].data.data;
  }

  let error: Error;
  try {
    error = await response.json();
  } catch {
    error = new Error("Something wrong happened");
  }
  throw error;
};

export const getReservoirFillCalldata = withReadableError(_getReservoirFillCalldata);
