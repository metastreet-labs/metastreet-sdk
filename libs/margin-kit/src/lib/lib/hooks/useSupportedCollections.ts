import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";

const useSupportedCollections = () => {
  const { provider, deployment, chainID } = useMetaStreetDeployment();

  const fetcher = () => {
    if (!deployment) throw new Error("deployment is undefined");

    // TODO: this should come from the params
    const vaultAddress = deployment.vaults[0];

    return getSupportedCollections({ signerOrProvider: provider, deployment, vaultAddress });
  };

  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(chainID), fetcher, {
    enabled: Boolean(deployment),
  });
};

const supportedCollectionsQueryKeys = {
  all: (chainID: number) => ["supported-collections", chainID],
};

export default useSupportedCollections;
