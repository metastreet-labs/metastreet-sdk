import useSupportedCollections from "./useSupportedCollections";

const useIsCollectionSupported = (collectionAddress: string) => {
  const { supportedCollections, supportedCollectionsError } = useSupportedCollections();

  const isCollectionSupported = supportedCollections?.includes(collectionAddress.toLowerCase());

  return {
    isCollectionSupported,
    isCollectionSupportedError: supportedCollectionsError,
  };
};

export default useIsCollectionSupported;
