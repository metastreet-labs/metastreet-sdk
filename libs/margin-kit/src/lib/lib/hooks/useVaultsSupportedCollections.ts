import {
  getVaultsSupportedCollections,
  GetVaultsSupportedCollectionsResult,
  ReadableError,
} from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";

export const useVaultsSupportedCollections = () => {
  const { deployment, provider } = useMetaStreetDeployment();

  const fetcher = () => {
    if (!deployment) throw new Error("deployment is undefined");
    return getVaultsSupportedCollections({ signerOrProvider: provider, vaultAddresses: deployment.vaults });
  };

  return useQuery<GetVaultsSupportedCollectionsResult, ReadableError>(
    vaultsSupportedCollectionsQKs.vaults(deployment?.vaults ?? []),
    fetcher,
    { enabled: Boolean(deployment) }
  );
};

const vaultsSupportedCollectionsQKs = {
  all: () => ["vaults-supported-collections"],
  vaults: (vaultAddresses: string[]) => [...vaultsSupportedCollectionsQKs.all(), vaultAddresses.join("-")],
};
