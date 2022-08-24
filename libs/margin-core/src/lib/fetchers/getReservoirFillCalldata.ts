import { Deployment } from "../deployments";

interface GetReservoirFillCalldataProps {
  deployment: Deployment;
  collectionAddress: string;
  tokenID: string;
  apiKey?: string;
}

export const getReservoirFillCalldata = async (props: GetReservoirFillCalldataProps): Promise<string> => {
  const { deployment, collectionAddress, tokenID, apiKey } = props;
  // construct URL
  const params = new URLSearchParams();
  params.append("taker", deployment.lbWrapperAddress);
  params.append("token", `${collectionAddress}:${tokenID}`);
  params.append("skipBalanceCheck", "true");
  const url = `${deployment.reservoirURL}/execute/buy/v2?${params}`;
  // if api key was passed, add it to the headers
  const headers: Record<string, string> = {};
  if (apiKey) headers["x-api"] = apiKey;
  // send the request
  const response = await fetch(url, { headers });
  if (response.ok) {
    const json = await response.json();
    return json.steps[0].data.data;
  }

  let error: Error;
  try {
    error = await response.json();
  } catch {
    error = new Error("Something wrong happened");
  }
  throw error;
};
