import { useVaultsSupportedCollections } from "./useVaultsSupportedCollections";

export const useSupportingVaults = (collectionAddress: string) => {
  const { data: vaultsSupportedCollections, ...rest } = useVaultsSupportedCollections();

  let data: string[] | undefined;
  if (vaultsSupportedCollections) {
    const { all, ...withoutAll } = vaultsSupportedCollections;
    data = Object.keys(withoutAll).filter((vaultAddress) => withoutAll[vaultAddress].includes(collectionAddress));
  }

  return { data, ...rest };
};
