import useBuyWithLeverageButton from "../../hooks/useBuyWithLeverageButton";
import { BWLToken } from "../../types";
import BaseBuyWithLeverageButton from "./BaseBuyWithLeverageButton";
import ErrorButton from "./placeholders/ErrorButton";
import LoadingButton from "./placeholders/LoadingButton";

interface BuyWithLeverageButtonProps {
  tokens: BWLToken[];
  onClick: () => void;
  className?: string;
}

export const BuyWithLeverageButton = (props: BuyWithLeverageButtonProps) => {
  const { tokens, onClick, className } = props;
  const bwlButton = useBuyWithLeverageButton({ tokens });

  if (bwlButton.status == "error") return <ErrorButton className={className} error={`${bwlButton.error}`} />;
  if (bwlButton.status == "loading") return <LoadingButton className={className} />;

  return <BaseBuyWithLeverageButton onClick={onClick} className={className} />;
};
