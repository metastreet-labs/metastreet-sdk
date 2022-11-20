import {
  getVaultsSupportedCollections,
  GetVaultsSupportedCollectionsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useVaultsSupportedCollections = () => {
  const { provider, chainID } = useMetaStreetDeployment();

  const [fetcher, enabled] = useFetcherWithDeployment((deployment) => {
    return getVaultsSupportedCollections({ signerOrProvider: provider, vaultAddresses: deployment.vaults });
  });

  return useQuery<GetVaultsSupportedCollectionsResult, ReadableError>(
    vaultsSupportedCollectionsQKs.chain(chainID),
    fetcher,
    { enabled }
  );
};

const vaultsSupportedCollectionsQKs = {
  all: () => ["vaults-supported-collections"],
  chain: (chainID: number) => [...vaultsSupportedCollectionsQKs.all(), chainID],
};
