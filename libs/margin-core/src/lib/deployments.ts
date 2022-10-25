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
    subgraphURI:
      "https://gateway.thegraph.com/api/3da96fefdc83e3aee6b1fbe05079077f/subgraphs/id/HPvcWgsjmQG1U7YeS9RRMqYpQZc2RH8wrd3zatpb3AS6",
    reservoirURL: "https://api.reservoir.tools",
  },
  [CHAIN_IDS.goerli]: {
    vaultAddress: "0x99156878c19c46c492d3ac40a3a8483c3740a9d5",
    lbWrapperAddress: "0x5D17Fb028eB1D4aC437e2E94aB0A47146d6cC2Ce",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb-subgraph-goerli/v1.0.0",
    reservoirURL: "https://api-goerli.reservoir.tools",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
    reservoirURL: "",
  },
};
