import { Deployment } from "@metastreet-labs/margin-core";
import { createContext, ReactNode } from "react";
import { useDeployment } from "../hooks/useDeployment";

export const DefinedDeploymentContext = createContext<Deployment | undefined>(undefined);

interface DefinedDeploymentProviderProps {
  children: ReactNode;
  errorComponent: ReactNode;
}

const DefinedDeploymentProvider = (props: DefinedDeploymentProviderProps) => {
  const { children, errorComponent } = props;
  const deployment = useDeployment();

  if (!deployment) return <>{errorComponent}</>;

  return <DefinedDeploymentContext.Provider value={deployment}>{children}</DefinedDeploymentContext.Provider>;
};

export default DefinedDeploymentProvider;
