import { BASE_PROXY_URL, LEVERAGE_BUY_WRAPPER_ADDRESS } from "meta-street/env";

type GetReservoirFillCalldataProps = {
  collectionAddress: string;
  tokenID: string;
};

const getReservoirFillCalldata = async (props: GetReservoirFillCalldataProps): Promise<string> => {
  const params = new URLSearchParams();
  params.append("taker", LEVERAGE_BUY_WRAPPER_ADDRESS);
  params.append("token", `${props.collectionAddress}:${props.tokenID}`);
  params.append("skipBalanceCheck", "true");
  const url = `${BASE_PROXY_URL}/execute/buy/v2?${params}`;
  const response = await fetch(url);
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

export default getReservoirFillCalldata;
