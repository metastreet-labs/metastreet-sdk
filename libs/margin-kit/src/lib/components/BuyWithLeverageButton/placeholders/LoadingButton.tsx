import classNames from "classnames";
import BaseBuyWithLeverageButton from "../BaseBuyWithLeverageButton";

interface LoadingButtonProps {
  className?: string;
}

const LoadingButton = (props: LoadingButtonProps) => {
  return <BaseBuyWithLeverageButton className={classNames("disabled:cursor-wait", props.className)} disabled />;
};

export default LoadingButton;
