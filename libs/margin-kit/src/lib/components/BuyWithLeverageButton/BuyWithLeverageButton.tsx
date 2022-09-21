import useIsCollectionSupported from "meta-street/lib/hooks/useIsCollectionSupported";
import { BWLToken } from "meta-street/types";
import { useNetwork, useSigner } from "wagmi";
import BaseBuyWithLeverageButton from "./BaseBuyWithLeverageButton";
import ErrorButton from "./placeholders/ErrorButton";
import LoadingButton from "./placeholders/LoadingButton";

type BuyWithLeverageButtonProps = {
  tokens: BWLToken[];
  onClick: () => void;
  className?: string;
};

// TODO: replace with deployments
const supportedChainIDs = [1, 4, 5];

const BuyWithLeverageButton = (props: BuyWithLeverageButtonProps) => {
  const { tokens, onClick, className } = props;
  const { data: signer } = useSigner();
  const { chain: activeChain } = useNetwork();
  const { isCollectionSupported, isCollectionSupportedError } = useIsCollectionSupported(
    tokens[0]?.collectionAddress ?? ""
  );

  if (tokens.length == 0) {
    return <ErrorButton error="No tokens to buy" className={className} />;
  }

  const isWalletConnected = Boolean(signer);
  const isNetworkSupported = supportedChainIDs.includes(activeChain?.id ?? -1);
  const isSingleCollection = tokens.every((token) => token.collectionAddress == tokens[0].collectionAddress);

  if (isWalletConnected && isNetworkSupported && isSingleCollection && isCollectionSupported) {
    return <BaseBuyWithLeverageButton onClick={onClick} className={className} />;
  }

  let error: string | undefined;
  if (!isWalletConnected) error = "Wallet not connected";
  else if (!isNetworkSupported) error = "Unsupported network";
  else if (!isSingleCollection) error = "Cannot buy tokens from different collections at the same time";
  else if (isCollectionSupported == false) "Unsupported collection";
  else if (isCollectionSupportedError) error = isCollectionSupportedError;
  if (error) return <ErrorButton error={error} className={className} />;

  return <LoadingButton className={className} />;
};

export default BuyWithLeverageButton;
