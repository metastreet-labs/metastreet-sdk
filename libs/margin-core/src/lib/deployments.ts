export const CHAIN_IDS = {
  mainnet: 1,
  rinkeby: 4,
  hardhat: 31337,
};

export interface Deployment {
  vaultAddress: string;
  lbWrapperAddress: string;
  subgraphURI: string;
  reservoirURL: string;
}

export const DEPLOYMENTS: Record<number, Deployment> = {
  [CHAIN_IDS.mainnet]: {
    vaultAddress: "0x7770cD73e035C37BDf8875eEE81577c63202Ab8d",
    lbWrapperAddress: "0x28a7C8973CF696D0EEb5f1c92a42B31548daaebb",
    subgraphURI: "",
    reservoirURL: "https://api.reservoir.tools",
  },
  [CHAIN_IDS.rinkeby]: {
    vaultAddress: "0x786E7B3BeD67f32627FE2Cb4aa07c1FB8994581D",
    lbWrapperAddress: "0xa4F3e9a7ee8100CA430CebAee04B1a998b7cFBe2",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb/5.8",
    reservoirURL: "https://api-rinkeby.reservoir.tools",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
    reservoirURL: "",
  },
};
