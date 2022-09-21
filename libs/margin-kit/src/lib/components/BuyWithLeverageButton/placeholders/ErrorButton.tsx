import classNames from "classnames";
import Tooltip from "meta-street/components/Tooltip";
import BaseBuyWithLeverageButton from "../BaseBuyWithLeverageButton";

type ErrorButtonProps = { error: string; className?: string };

const ErrorButton = (props: ErrorButtonProps) => {
  return (
    <Tooltip
      className={classNames("flex cursor-not-allowed", props.className)}
      trigger={<BaseBuyWithLeverageButton disabled className="pointer-events-none" />}
      tooltipText={props.error}
    />
  );
};

export default ErrorButton;
