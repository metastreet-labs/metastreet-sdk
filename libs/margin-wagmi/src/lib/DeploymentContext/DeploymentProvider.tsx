import { Deployment, DEPLOYMENTS } from "@metastreet-labs/margin-core";
import React, { useMemo } from "react";
import { useProvider } from "wagmi";

export const DeploymentContext = React.createContext<{ chainId: number; deployment: Deployment } | undefined>(
  undefined
);

export const DeploymentProvider = ({ children }: { children: React.ReactNode }) => {
  const provider = useProvider();
  const chainId = provider.network.chainId;
  const value = useMemo(() => {
    const deployment = DEPLOYMENTS[chainId];
    return { deployment, chainId };
  }, [chainId]);

  return <DeploymentContext.Provider value={value}>{children}</DeploymentContext.Provider>;
};

export default DeploymentProvider;
