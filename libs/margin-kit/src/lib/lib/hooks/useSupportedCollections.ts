import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

const useSupportedCollections = () => {
  const { provider, deployment, chainID } = useDefinedMetaStreetDeployment();
  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(chainID), () =>
    getSupportedCollections({ signerOrProvider: provider, deployment })
  );
};

const supportedCollectionsQueryKeys = {
  all: (chainID: number) => ["supported-collections", chainID],
};

export default useSupportedCollections;
