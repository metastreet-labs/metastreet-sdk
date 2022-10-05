import { createContext, ReactNode } from "react";
import useMetaStreetDeployment, { MetaStreetDeployment } from "../../hooks/useMetaStreetDeployment";

export const MetaStreetDeploymentContext = createContext<MetaStreetDeployment | undefined>(undefined);

interface MetaStreetDeploymentProviderProps {
  children: ReactNode;
  errorComponent: ReactNode;
}

const MetaStreetDeploymentProvider = (props: MetaStreetDeploymentProviderProps) => {
  const { children, errorComponent } = props;
  const deployment = useMetaStreetDeployment();

  if (!deployment) return <>{errorComponent}</>;

  return <MetaStreetDeploymentContext.Provider value={deployment}>{children}</MetaStreetDeploymentContext.Provider>;
};

export default MetaStreetDeploymentProvider;
