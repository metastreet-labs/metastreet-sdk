import classNames from "classnames";
import MetaStreetBadge from "meta-street/components/MetaStreetBadge";

type BaseBuyWithLeverageButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const BaseBuyWithLeverageButton = (props: BaseBuyWithLeverageButtonProps) => {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={classNames("btn-slate-fill flex-grow", className)}>
      Buy with Leverage
      <MetaStreetBadge
        className={classNames("h-6 w-6")}
        bgColor={props.disabled ? "#d1d5db" : "white"}
        logoColor={props.disabled ? "#9ca3af" : "#334155"}
      />
    </button>
  );
};

export default BaseBuyWithLeverageButton;
