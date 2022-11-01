import useBuyWithLeverageButton from "../../hooks/useBuyWithLeverageButton";
import { BWLToken } from "../../types";
import MetaStreetDeploymentProvider from "../MetaStreetDeploymentProvider";
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
  const bwlButton = useBuyWithLeverageButton({ tokens });

  if (bwlButton.status == "error") return <ErrorButton className={className} error={`${bwlButton.error}`} />;
  if (bwlButton.status == "loading") return <LoadingButton className={className} />;

  return <BaseBuyWithLeverageButton onClick={onClick} className={className} />;
};

const BuyWithLeverageButton = (props: BuyWithLeverageButtonProps) => {
  return (
    <MetaStreetDeploymentProvider errorComponent={<ErrorButton error="Unsupported chain" />}>
      <ActualBuyWithLeverageButton {...props} />
    </MetaStreetDeploymentProvider>
  );
};

export default BuyWithLeverageButton;
