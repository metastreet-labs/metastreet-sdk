import { ReadableError } from "@metastreet-labs/margin-core";
import { useSupportingVaults } from "./useSupportingVaults";
import { useVaultsLimits, VaultLimits } from "./useVaultsLimits";

interface UseSupportingVaultsLimitsParams {
  collectionAddress: string;
  tokenID: string;
}

export const useSupportingVaultsLimits = (params: UseSupportingVaultsLimitsParams) => {
  const { data: supportingVaults, error: supportingVaultsError } = useSupportingVaults(params.collectionAddress);
  const { data: allVaultsLimits, error: allVaultsLimitsError } = useVaultsLimits(params);

  let error: ReadableError | null = supportingVaultsError ?? allVaultsLimitsError;
  let data: VaultLimits[] | undefined;
  if (supportingVaults && allVaultsLimits) {
    // get limits of vaults that support collectionAddress
    data = allVaultsLimits.filter((limit) => supportingVaults.includes(limit.vaultAddress));
    // if no vault supports collectionAddress
    if (data.length == 0) {
      // set data to undefined
      data = undefined;
      // and error to "Unsupported collection"
      error = { message: "Unsupported collection", originalError: new Error("Unsupported collection") };
    }
  }

  return { data, error };
};
