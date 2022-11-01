import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";

const useSupportedCollections = () => {
  const { provider, deployment, chainID } = useMetaStreetDeployment();

  const fetcher = () => {
    if (!deployment) throw new Error("no deployment is undefined");
    return getSupportedCollections({ signerOrProvider: provider, deployment });
  };

  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(chainID), fetcher, {
    enabled: Boolean(deployment),
  });
};

const supportedCollectionsQueryKeys = {
  all: (chainID: number) => ["supported-collections", chainID],
};

export default useSupportedCollections;
