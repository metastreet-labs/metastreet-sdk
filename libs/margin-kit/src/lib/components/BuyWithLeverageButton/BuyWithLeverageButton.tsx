import { useSigner } from "wagmi";
import useIsCollectionSupported from "../../lib/hooks/useIsCollectionSupported";
import { BWLToken } from "../../types";
import MetaStreetDeploymentProvider from "../MetaStreetDeploymentProvider/DeploymentProvider";
import BaseBuyWithLeverageButton from "./BaseBuyWithLeverageButton";
import ErrorButton from "./placeholders/ErrorButton";
import LoadingButton from "./placeholders/LoadingButton";

interface BuyWithLeverageButtonProps {
  tokens: BWLToken[];
  onClick: () => void;
  className?: string;
}

const ActualBuyWithLeverageButton = (props: BuyWithLeverageButtonProps) => {
  const { tokens, onClick, className } = props;
  const { data: signer } = useSigner();
  const { isCollectionSupported, isCollectionSupportedError } = useIsCollectionSupported(
    tokens[0]?.collectionAddress ?? ""
  );

  if (tokens.length == 0) {
    return <ErrorButton error="No tokens to buy" className={className} />;
  }

  const isWalletConnected = Boolean(signer);
  const isSingleCollection = tokens.every((token) => token.collectionAddress == tokens[0].collectionAddress);

  if (isWalletConnected && isSingleCollection && isCollectionSupported) {
    return <BaseBuyWithLeverageButton onClick={onClick} className={className} />;
  }

  let error: string | undefined;
  if (!isWalletConnected) error = "Wallet not connected";
  else if (!isSingleCollection) error = "Cannot buy tokens from different collections at the same time";
  else if (isCollectionSupported == false) error = "Unsupported collection";
  else if (isCollectionSupportedError) error = isCollectionSupportedError.message;
  if (error) return <ErrorButton error={error} className={className} />;

  return <LoadingButton className={className} />;
};

const BuyWithLeverageButton = (props: BuyWithLeverageButtonProps) => {
  return (
    <MetaStreetDeploymentProvider errorComponent={<ErrorButton error="Unsupported chain" />}>
      <ActualBuyWithLeverageButton {...props} />
    </MetaStreetDeploymentProvider>
  );
};

export default BuyWithLeverageButton;
