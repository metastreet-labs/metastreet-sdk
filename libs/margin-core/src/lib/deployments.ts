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
    lbWrapperAddress: "0x558aD8278B6D127dc8F58e02Ee578Df20ec98406",
    subgraphURI: "https://api.studio.thegraph.com/query/26817/metastreet-lb-alpha/v0.0.3",
    reservoirURL: "https://api.reservoir.tools",
  },
  [CHAIN_IDS.goerli]: {
    vaultAddress: "0x99156878c19c46c492d3ac40a3a8483c3740a9d5",
    lbWrapperAddress: "0xEA149987421D9F07897bE4739Ce9431AFf8642c2",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb-goerli/0.11",
    reservoirURL: "https://api-goerli.reservoir.tools",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
    reservoirURL: "",
  },
};
