import { useContext } from "react";
import { MetaStreetDeploymentContext } from "../components/MetaStreetDeploymentProvider/MetaStreetDeploymentProvider";

const useDefinedMetaStreetDeployment = () => {
  const deployment = useContext(MetaStreetDeploymentContext);
  if (!deployment) throw new Error("useDefinedMetaStreetDeployment was used outside of MetaStreetDeploymentProvider");
  return deployment;
};

export default useDefinedMetaStreetDeployment;
