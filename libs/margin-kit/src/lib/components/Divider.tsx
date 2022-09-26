import classNames from "classnames";

const Divider = ({ className = "" }) => {
  return <div className={classNames("bwl-divider", className)} />;
};

export default Divider;
