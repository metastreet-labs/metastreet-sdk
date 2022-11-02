import { defaultDeployments, Deployment } from "@metastreet-labs/margin-core";
import { createContext, PropsWithChildren } from "react";
import { chain, useNetwork } from "wagmi";

export const DeploymentContext = createContext<Deployment | undefined>(undefined);

interface SubgraphURLs {
  mainnet?: string;
  goerli?: string;
}

type DeploymentProviderProps = PropsWithChildren & {
  subgraphURLs?: SubgraphURLs;
};

const DeploymentProvider = (props: DeploymentProviderProps) => {
  const { children, subgraphURLs } = props;
  const { chain: activeChain } = useNetwork();

  const chainID = activeChain?.id ?? chain.mainnet.id;
  const deployment = { ...defaultDeployments[chainID] };

  if (deployment) {
    if (subgraphURLs) {
      if (chainID == chain.mainnet.id && subgraphURLs.mainnet) deployment.subgraphURI = subgraphURLs.mainnet;
      if (chainID == chain.goerli.id && subgraphURLs.goerli) deployment.subgraphURI = subgraphURLs.goerli;
    }
  }

  return <DeploymentContext.Provider value={deployment}>{children}</DeploymentContext.Provider>;
};

export default DeploymentProvider;
