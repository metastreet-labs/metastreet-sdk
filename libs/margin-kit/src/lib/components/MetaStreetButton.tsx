import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type MetaStreetButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const MetaStreetButton = (props: MetaStreetButtonProps) => {
  const { className, disabled, loading, children, ...rest } = props;

  return (
    <button className={classNames("metastreet-button", className)} disabled={disabled || loading} {...rest}>
      {loading ? <Spinner className="metastreet-button-spinner" /> : null}
      {children}
    </button>
  );
};

export default MetaStreetButton;
