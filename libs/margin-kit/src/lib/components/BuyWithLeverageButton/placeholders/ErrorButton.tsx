import classNames from "classnames";
import Tooltip from "../../Tooltip";
import BaseBuyWithLeverageButton from "../BaseBuyWithLeverageButton";

interface ErrorButtonProps {
  error: string;
  className?: string;
}

const ErrorButton = (props: ErrorButtonProps) => {
  return (
    <Tooltip
      className={classNames("flex cursor-not-allowed", props.className)}
      trigger={<BaseBuyWithLeverageButton disabled className="pointer-events-none w-full" />}
      tooltipText={props.error}
    />
  );
};

export default ErrorButton;
