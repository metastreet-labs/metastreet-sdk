import { defaultDeployments, Deployment } from "@metastreet-labs/margin-core";
import { createContext, PropsWithChildren } from "react";
import { chain, useNetwork } from "wagmi";

export const DeploymentContext = createContext<Deployment | undefined>(undefined);

interface SubgraphURIs {
  mainnet?: string;
  goerli?: string;
}

type DeploymentProviderProps = PropsWithChildren & {
  subgraphURIs?: SubgraphURIs;
};

const DeploymentProvider = (props: DeploymentProviderProps) => {
  const { children, subgraphURIs } = props;
  const { chain: activeChain } = useNetwork();

  const chainID = activeChain?.id ?? chain.mainnet.id;
  const deployment = { ...defaultDeployments[chainID] };

  if (deployment) {
    if (subgraphURIs) {
      if (chainID == chain.mainnet.id && subgraphURIs.mainnet) deployment.subgraphURI = subgraphURIs.mainnet;
      if (chainID == chain.goerli.id && subgraphURIs.goerli) deployment.subgraphURI = subgraphURIs.goerli;
    }
  }

  return <DeploymentContext.Provider value={deployment}>{children}</DeploymentContext.Provider>;
};

export default DeploymentProvider;
