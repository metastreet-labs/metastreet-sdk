export const CHAIN_IDS = {
  mainnet: 1,
  rinkeby: 4,
  hardhat: 31337,
};

export interface Deployment {
  vaultAddress: string;
  lbWrapperAddress: string;
}

export const DEPLOYMENTS: Record<number, Deployment> = {
  [CHAIN_IDS.mainnet]: {
    vaultAddress: "",
    lbWrapperAddress: "",
  },
  [CHAIN_IDS.rinkeby]: {
    vaultAddress: "",
    lbWrapperAddress: "",
  },
  [CHAIN_IDS.hardhat]: {
    vaultAddress: "",
    lbWrapperAddress: "",
  },
};
