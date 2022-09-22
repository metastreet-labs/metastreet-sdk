import useSupportedCollections from "./useSupportedCollections";

const useIsCollectionSupported = (collectionAddress: string) => {
  const { data, error } = useSupportedCollections();

  const isCollectionSupported = data?.includes(collectionAddress.toLowerCase());

  return {
    isCollectionSupported,
    isCollectionSupportedError: error,
  };
};

export default useIsCollectionSupported;
