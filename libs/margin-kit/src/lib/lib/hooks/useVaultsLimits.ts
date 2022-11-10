import { getCollateralLimits, GetCollateralLimitsResult, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useDefinedMetaStreetDeployment from "../../hooks/useDefinedMetaStreetDeployment";

interface UseVaultsLimitsParams {
  collectionAddress: string;
  tokenID: string;
}

export type VaultLimit = GetCollateralLimitsResult & { vaultAddress: string };

export const useVaultsLimits = (params: UseVaultsLimitsParams) => {
  const { deployment, provider } = useDefinedMetaStreetDeployment();

  const fetcher = async () => {
    // Fetch collateral limits of each vault
    const limits = await Promise.all(
      deployment.vaults.map(async (vaultAddress) => {
        const limit = await getCollateralLimits({
          ...params,
          vaultAddress,
          deployment,
          signerOrProvider: provider,
        });
        return { ...limit, vaultAddress };
      })
    );
    // it is required that the limits are sorted by maxPrincipal in an ascending order
    limits.sort((a, b) => (a.maxPrincipal.lt(b.maxPrincipal) ? -1 : 1));
    return limits;
  };

  return useQuery<VaultLimit[], ReadableError>(vaultsLimitsQueryKeys.token(params), fetcher);
};

const vaultsLimitsQueryKeys = {
  all: () => ["vaults-limits"],
  token: (params: UseVaultsLimitsParams) => [...vaultsLimitsQueryKeys.all(), params],
};
