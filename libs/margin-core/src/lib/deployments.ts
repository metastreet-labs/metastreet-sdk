export const CHAIN_IDS = {
  mainnet: 1,
  rinkeby: 4,
  hardhat: 31337,
};

export interface Deployment {
  vaultAddress: string;
  lbWrapperAddress: string;
  subgraphURI: string;
}

export const DEPLOYMENTS: Record<number, Deployment> = {
  [CHAIN_IDS.mainnet]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
  },
  [CHAIN_IDS.rinkeby]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
    subgraphURI: "",
  },
};
