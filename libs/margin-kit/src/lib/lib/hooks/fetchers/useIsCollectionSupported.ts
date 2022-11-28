import { useVaultsSupportedCollections } from "./useVaultsSupportedCollections";

export const useIsCollectionSupported = (collectionAddress: string) => {
  const { data, error } = useVaultsSupportedCollections();

  const isCollectionSupported = data?.all.includes(collectionAddress.toLowerCase());

  return {
    isCollectionSupported,
    isCollectionSupportedError: error,
  };
};
