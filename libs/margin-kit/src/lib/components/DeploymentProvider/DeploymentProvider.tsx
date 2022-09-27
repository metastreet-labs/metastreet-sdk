import { Deployment, DEPLOYMENTS } from "@metastreet-labs/margin-core";
import { Provider } from "@wagmi/core";
import { createContext, ReactNode } from "react";
import { useProvider } from "wagmi";

export interface MetaStreetDeployment {
  provider: Provider;
  chainID: number;
  deployment: Deployment;
}

export const MetaStreetDeploymentContext = createContext<MetaStreetDeployment | undefined>(undefined);

interface DeploymentProviderProps {
  children: ReactNode;
  errorComponent: ReactNode;
}

const DeploymentProvider = (props: DeploymentProviderProps) => {
  const { children, errorComponent } = props;
  const provider = useProvider();
  const chainID = provider.network.chainId;
  const deployment = DEPLOYMENTS[chainID];

  if (!deployment) return <>{errorComponent}</>;

  const value = { provider, chainID, deployment };
  return <MetaStreetDeploymentContext.Provider value={value}>{children}</MetaStreetDeploymentContext.Provider>;
};

export default DeploymentProvider;
