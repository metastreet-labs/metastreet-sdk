import { getSupportedCollections, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDeployment from "./useDeployment";

const useSupportedCollections = () => {
  const { provider, deployment } = useDeployment();
  return useQuery<string[], ReadableError>(supportedCollectionsQueryKeys.all(), () =>
    getSupportedCollections({ signerOrProvider: provider, deployment })
  );
};

const supportedCollectionsQueryKeys = {
  all: () => ["supported-collections"],
};

export default useSupportedCollections;
