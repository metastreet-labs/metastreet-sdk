import {
  getVaultsSupportedCollections,
  GetVaultsSupportedCollectionsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useChainID from "../../hooks/useChainID";
import useSignerOrProvider from "../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

export const useVaultsSupportedCollections = () => {
  const { signerOrProvider } = useSignerOrProvider();
  const chainID = useChainID();

  const fetcher = useFetcherWithDeployment((deployment) => {
    return getVaultsSupportedCollections({ signerOrProvider, vaultAddresses: deployment.vaults });
  });

  return useQuery<GetVaultsSupportedCollectionsResult, ReadableError>(
    vaultsSupportedCollectionsQKs.chain(chainID),
    fetcher
  );
};

const vaultsSupportedCollectionsQKs = {
  all: () => ["vaults-supported-collections"],
  chain: (chainID: number) => [...vaultsSupportedCollectionsQKs.all(), chainID],
};
