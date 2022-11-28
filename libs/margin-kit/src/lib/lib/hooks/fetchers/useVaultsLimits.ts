import { getCollateralLimits, GetCollateralLimitsResult, ReadableError } from "@metastreet-labs/margin-core";
import { useQuery } from "wagmi";
import useSignerOrProvider from "../../../hooks/useSignerOrProvider";
import { useFetcherWithDeployment } from "./useFetcherWithDeployment";

interface UseVaultsLimitsParams {
  collectionAddress: string;
  tokenID: string;
}

export type VaultLimits = GetCollateralLimitsResult & { vaultAddress: string };

export const useVaultsLimits = (params: UseVaultsLimitsParams) => {
  const { signerOrProvider } = useSignerOrProvider();

  const fetcher = useFetcherWithDeployment(async (deployment) => {
    // Fetch collateral limits of each vault
    const limits = await Promise.all(
      deployment.vaults.map(async (vaultAddress) => {
        const limit = await getCollateralLimits({ ...params, ...deployment, vaultAddress, signerOrProvider });
        return { ...limit, vaultAddress };
      })
    );
    // it is required that the limits are sorted by maxPrincipal in an ascending order
    limits.sort((a, b) => (a.maxPrincipal.lt(b.maxPrincipal) ? -1 : 1));
    return limits;
  });

  return useQuery<VaultLimits[], ReadableError>(useVaultsLimitsQKs.token(params), fetcher);
};

export const useVaultsLimitsQKs = {
  all: () => ["vaults-limits"],
  token: (params: UseVaultsLimitsParams) => [...useVaultsLimitsQKs.all(), params],
};
