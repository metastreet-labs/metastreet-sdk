import classNames from "classnames";

const LoadingText = ({ className = "bg-gray-200" }) => {
  return <div className={classNames("inline h-[1.25rem] w-20 animate-pulse rounded bg-gray-200", className)} />;
};

export default LoadingText;
