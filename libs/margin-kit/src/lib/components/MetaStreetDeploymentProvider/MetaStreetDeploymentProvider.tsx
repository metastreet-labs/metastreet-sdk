import { Deployment } from "@metastreet-labs/margin-core";
import { createContext, ReactNode } from "react";
import useMetaStreetDeployment, { MetaStreetDeployment } from "../../hooks/useMetaStreetDeployment";

type DefinedMetaStreetDeployment = Omit<MetaStreetDeployment, "deployment"> & { deployment: Deployment };

export const MetaStreetDeploymentContext = createContext<DefinedMetaStreetDeployment | undefined>(undefined);

interface MetaStreetDeploymentProviderProps {
  children: ReactNode;
  errorComponent: ReactNode;
}

const MetaStreetDeploymentProvider = (props: MetaStreetDeploymentProviderProps) => {
  const { children, errorComponent } = props;
  const { deployment, ...rest } = useMetaStreetDeployment();

  if (!deployment) return <>{errorComponent}</>;

  return (
    <MetaStreetDeploymentContext.Provider value={{ deployment, ...rest }}>
      {children}
    </MetaStreetDeploymentContext.Provider>
  );
};

export default MetaStreetDeploymentProvider;
