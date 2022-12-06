import {
  getVaultsSupportedCollections,
  GetVaultsSupportedCollectionsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useMetaStreetQuery } from "../../../components/MetaStreetConfig/MetaStreetQueryClientProvider";
import useChainID from "../../../hooks/meta-street-config/useChainID";
import useSignerOrProvider from "../../../hooks/meta-street-config/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useVaultsSupportedCollections = () => {
  const { signerOrProvider } = useSignerOrProvider();
  const chainID = useChainID();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getVaultsSupportedCollections({ signerOrProvider, vaultAddresses: deployment.vaults });
  });

  return useMetaStreetQuery<GetVaultsSupportedCollectionsResult, ReadableError>(
    useVaultsSupportedCollectionsQKs.chain(chainID),
    fetcher
  );
};

export const useVaultsSupportedCollectionsQKs = {
  all: () => ["vaults-supported-collections"],
  chain: (chainID: number) => [...useVaultsSupportedCollectionsQKs.all(), chainID],
};
