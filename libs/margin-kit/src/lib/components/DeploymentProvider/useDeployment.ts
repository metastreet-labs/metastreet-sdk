import { useContext } from "react";
import { MetaStreetDeploymentContext } from "./DeploymentProvider";

const useDeployment = () => {
  const deployment = useContext(MetaStreetDeploymentContext);
  if (!deployment) throw new Error("useDeployment was used outside of DeploymentProvider");
  return deployment;
};

export default useDeployment;
