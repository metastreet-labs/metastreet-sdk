import { getCollateralLimits, GetCollateralLimitsResult, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useMetaStreetDeployment from "../../hooks/useMetaStreetDeployment";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

interface UseVaultsLimitsParams {
  collectionAddress: string;
  tokenID: string;
}

export type VaultLimits = GetCollateralLimitsResult & { vaultAddress: string };

export const useVaultsLimits = (params: UseVaultsLimitsParams) => {
  const { provider } = useMetaStreetDeployment();

  const [fetcher, enabled] = useFetcherWithDeployment(async (deployment) => {
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
  });

  return useQuery<VaultLimits[], ReadableError>(vaultsLimitsQueryKeys.token(params), fetcher, { enabled });
};

const vaultsLimitsQueryKeys = {
  all: () => ["vaults-limits"],
  token: (params: UseVaultsLimitsParams) => [...vaultsLimitsQueryKeys.all(), params],
};
