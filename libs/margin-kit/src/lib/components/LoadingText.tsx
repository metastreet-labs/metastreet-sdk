import classNames from "classnames";

const LoadingText = ({ className = "loading-text-gray" }) => {
  return <div className={classNames("loading-text", className)} />;
};

export default LoadingText;
