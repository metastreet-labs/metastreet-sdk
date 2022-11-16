import { Deployment } from "@metastreet-labs/margin-core";
import useDeployment from "../../hooks/useDeployment";

type UseFetcherWithDeploymentResult<T> = [() => Promise<T>, boolean];

export const useFetcherWithDeployment = <T>(
  fetcher: (deployment: Deployment) => Promise<T>
): UseFetcherWithDeploymentResult<T> => {
  const deployment = useDeployment();

  const useFetcherWithDeployment = () => {
    if (!deployment) throw new Error("deployment is undefined");
    return fetcher(deployment);
  };

  return [useFetcherWithDeployment, Boolean(deployment)];
};
