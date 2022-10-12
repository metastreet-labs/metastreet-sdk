export const CHAIN_IDS = {
  mainnet: 1,
  goerli: 5,
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
    vaultAddress: "0x7770cd73e035c37bdf8875eee81577c63202ab8d",
    lbWrapperAddress: "0x598F45E483974A20e610047ED5602ac9a8DBf87b",
    subgraphURI: "https://api.studio.thegraph.com/query/26817/metastreet-lb-alpha/v0.0.1",
    reservoirURL: "https://api.reservoir.tools",
  },
  [CHAIN_IDS.goerli]: {
    vaultAddress: "0x99156878c19c46c492d3ac40a3a8483c3740a9d5",
    lbWrapperAddress: "0x0b43A9a3840fe5cA8a752315Fd9e85c04e46402f",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb-goerli/0.10",
    reservoirURL: "https://api-goerli.reservoir.tools",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
    reservoirURL: "",
  },
};
