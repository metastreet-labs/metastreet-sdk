import { Deployment } from "@metastreet-labs/margin-core";
import { useDeployment } from "../../../hooks/useDeployment";

export const useFetcherWithDeployment = <T>(fetcher: (deployment: Deployment) => Promise<T>) => {
  const deployment = useDeployment();

  return () => {
    if (!deployment) throw new Error("Unsupported network");
    return fetcher(deployment);
  };
};
