import { getBlockNumber } from "./getBlockNumber";

interface WaitForSubgraphSyncParams {
  subgraphURI: string;
  blockNumber: number;
}
export const waitForSubgraphSync = (params: WaitForSubgraphSyncParams) => {
  return new Promise((resolve) => {
    const poll = async () => {
      const subgraphBlockNumber = await getBlockNumber(params.subgraphURI);
      if (subgraphBlockNumber >= params.blockNumber) resolve(undefined);
      else setTimeout(poll, 5000);
    };
    poll();
  });
};
