export const CHAIN_IDS = {
  mainnet: 1,
  goerli: 5,
  hardhat: 31337,
};

export interface Deployment {
  vaults: string[];
  lbWrapperAddress: string;
  multicallContractAddress: string;
  subgraphURI: string;
  reservoirURL: string;
}

export const defaultDeployments: Record<number, Deployment> = {
  1: {
    vaults: [
      "0x7770cd73e035c37bdf8875eee81577c63202ab8d",
      "0xf538ca7b3d5fb67003173f5827cf56d0dcdb08dd",
      "0xf380f3ba506498d31310141713e31ffd264b3da2",
    ],
    lbWrapperAddress: "0x558aD8278B6D127dc8F58e02Ee578Df20ec98406",
    multicallContractAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    subgraphURI:
      "https://gateway.thegraph.com/api/3da96fefdc83e3aee6b1fbe05079077f/subgraphs/id/HPvcWgsjmQG1U7YeS9RRMqYpQZc2RH8wrd3zatpb3AS6",
    reservoirURL: "https://api.reservoir.tools",
  },
  5: {
    vaults: ["0x99156878c19c46c492d3ac40a3a8483c3740a9d5", "0x823905D12Ef070eDBE19aD35Bcd1fe719Dd94016"],
    lbWrapperAddress: "0x5D17Fb028eB1D4aC437e2E94aB0A47146d6cC2Ce",
    multicallContractAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    subgraphURI: "https://api.studio.thegraph.com/query/31830/metastreet-lb-subgraph-goerli/v1.0.0",
    reservoirURL: "https://api-goerli.reservoir.tools",
  },
};
