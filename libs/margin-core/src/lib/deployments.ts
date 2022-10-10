export const CHAIN_IDS = {
  mainnet: 1,
  rinkeby: 4,
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
    lbWrapperAddress: "0x28a7C8973CF696D0EEb5f1c92a42B31548daaebb",
    subgraphURI: "",
    reservoirURL: "https://api.reservoir.tools",
  },
  [CHAIN_IDS.rinkeby]: {
    vaultAddress: "0x786e7b3bed67f32627fe2cb4aa07c1fb8994581d",
    lbWrapperAddress: "0xAadd79f5ba38e13744D820D66C1804ee85bc11A4",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb/6",
    reservoirURL: "https://api-rinkeby.reservoir.tools",
  },
  [CHAIN_IDS.goerli]: {
    vaultAddress: "0x99156878c19c46c492d3ac40a3a8483c3740a9d5",
    lbWrapperAddress: "0xAB5dF12A5D1ed9Ba46154298b6845ea981Eaf871",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb-goerli/0.7",
    reservoirURL: "https://api-goerli.reservoir.tools",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
    reservoirURL: "",
  },
};
