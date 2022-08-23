import React from "react";
import { DeploymentContext } from "../DeploymentProvider/DeploymentProvider";

export const useDeployment = () => {
  const context = React.useContext(DeploymentContext);
  if (context === undefined) {
    throw new Error("useDeployment must be used within DeploymentProvider");
  }
  return context;
};

export default useDeployment;
