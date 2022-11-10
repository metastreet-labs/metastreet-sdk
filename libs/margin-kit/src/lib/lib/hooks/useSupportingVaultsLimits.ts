import { useSupportingVaults } from "./useSupportingVaults";
import { useVaultsLimits, VaultLimit } from "./useVaultsLimits";

interface UseSupportingVaultsLimitsParams {
  collectionAddress: string;
  tokenID: string;
}

export const useSupportingVaultsLimits = (params: UseSupportingVaultsLimitsParams) => {
  const { data: supportingVaults, error: supportingVaultsError } = useSupportingVaults(params.collectionAddress);
  const { data: allVaultsLimits, error: allVaultsLimitsError } = useVaultsLimits(params);

  let data: VaultLimit[] | undefined;
  if (supportingVaults && allVaultsLimits) {
    data = allVaultsLimits.filter((limit) => supportingVaults.includes(limit.vaultAddress));
  }

  return { data, error: supportingVaultsError ?? allVaultsLimitsError };
};
