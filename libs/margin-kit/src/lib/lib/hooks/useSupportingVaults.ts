import { useVaultsSupportedCollections } from "./useVaultsSupportedCollections";

export const useSupportingVaults = (collectionAddress: string) => {
  const {
    data: vaultsSupportedCollections,
    error: vaultsSupportedCollectionsError,
    ...rest
  } = useVaultsSupportedCollections();

  let data: string[] | undefined;
  let error = vaultsSupportedCollectionsError;
  if (vaultsSupportedCollections) {
    const { all, ...withoutAll } = vaultsSupportedCollections;
    data = Object.keys(withoutAll).filter((vaultAddress) => withoutAll[vaultAddress].includes(collectionAddress));
    if (data.length == 0) {
      data = undefined;
      error = { message: "Unsupported collections", originalError: new Error("Unsupported collections") };
    }
  }

  return { data, error, ...rest };
};
