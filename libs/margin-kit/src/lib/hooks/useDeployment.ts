import { useContext } from "react";
import { DeploymentContext } from "../components/DeploymentProvider/DeploymentProvider";

export const useDeployment = () => useContext(DeploymentContext);
