import { useContext } from "react";
import { DeploymentContext } from "../components/DeploymentProvider/DeploymentProvider";

const useDeployment = () => useContext(DeploymentContext);

export default useDeployment;
