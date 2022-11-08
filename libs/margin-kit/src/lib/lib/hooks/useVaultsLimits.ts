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
    limits.sort((a, b) => (a.maxPrincipal.lt(b.maxPrincipal) ? -1 : 1));
    return limits;
  };

  return useQuery<VaultLimit[], ReadableError>(vaultsLimitsQueryKeys.token(params), fetcher);
};

const vaultsLimitsQueryKeys = {
  all: () => ["vaults-limits"],
  token: (params: UseVaultsLimitsParams) => [...vaultsLimitsQueryKeys.all(), params],
};
