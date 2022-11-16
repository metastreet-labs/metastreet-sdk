import { useContext } from "react";
import { DefinedDeploymentContext } from "../components/DefinedDeploymentProvider";

const useDefinedDeployment = () => {
  const deployment = useContext(DefinedDeploymentContext);
  if (!deployment) throw new Error("useDefinedDeployment was used outside of DefinedDeploymentProvider");
  return deployment;
};

export default useDefinedDeployment;
