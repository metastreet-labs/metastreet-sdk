import classNames from "classnames";

const Divider = ({ className = "" }) => {
  return <div className={classNames("h-[1px] bg-gray-200", className)} />;
};

export default Divider;
