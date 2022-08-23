import { Deployment, DEPLOYMENTS } from "@metastreet-sdk/pe-contracts-core";
import React, { PropsWithChildren, useMemo } from "react";

export const DeploymentContext = React.createContext<Deployment | undefined>(undefined);

export interface DeploymentProviderProps {
  chainId: number;
}

export function DeploymentProvider({ chainId, children }: PropsWithChildren<DeploymentProviderProps>) {
  const deployment = useMemo(() => {
    return DEPLOYMENTS[chainId];
  }, [chainId]);

  return <DeploymentContext.Provider value={deployment}>{children}</DeploymentContext.Provider>;
}

export default DeploymentProvider;
