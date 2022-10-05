import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../components/MetaStreetDeploymentProvider/useDefinedMetaStreetDeployment";

const useSupportedCollections = () => {
  const { provider, deployment } = useDefinedMetaStreetDeployment();
  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(), () =>
    getSupportedCollections({ signerOrProvider: provider, deployment })
  );
};

const supportedCollectionsQueryKeys = {
  all: () => ["supported-collections"],
};

export default useSupportedCollections;
