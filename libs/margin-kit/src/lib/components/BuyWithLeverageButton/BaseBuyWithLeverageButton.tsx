import classNames from "classnames";
import MetaStreetBadge from "../MetaStreetBadge";

interface BaseBuyWithLeverageButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const BaseBuyWithLeverageButton = (props: BaseBuyWithLeverageButtonProps) => {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={classNames("bwl-button", className)}>
      <span>Buy with Leverage</span>
      <MetaStreetBadge className="metastreet-badge" bgColor="white" logoColor="#7159AD" />
    </button>
  );
};

export default BaseBuyWithLeverageButton;
