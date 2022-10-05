import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../components/MetaStreetDeploymentProvider/useMetaStreetDeployment";

const useSupportedCollections = () => {
  const { provider, deployment } = useMetaStreetDeployment();
  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(), () =>
    getSupportedCollections({ signerOrProvider: provider, deployment })
  );
};

const supportedCollectionsQueryKeys = {
  all: () => ["supported-collections"],
};

export default useSupportedCollections;
