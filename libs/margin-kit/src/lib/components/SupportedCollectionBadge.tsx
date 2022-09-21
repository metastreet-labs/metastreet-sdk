import useIsCollectionSupported from "../lib/hooks/useIsCollectionSupported";
import MetaStreetBadge from "./MetaStreetBadge";

interface SupportedCollectionBadgeProps {
  collectionAddress: string;
  className?: string;
}

const SupportedCollectionBadge = (props: SupportedCollectionBadgeProps) => {
  const { collectionAddress, className } = props;
  const { isCollectionSupported } = useIsCollectionSupported(collectionAddress);

  if (isCollectionSupported) return <MetaStreetBadge className={className} />;
  return null;
};

export default SupportedCollectionBadge;