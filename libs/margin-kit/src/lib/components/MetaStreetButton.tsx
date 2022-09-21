import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

type MetaStreetButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const MetaStreetButton = (props: MetaStreetButtonProps) => {
  const { className, disabled, loading, children, ...rest } = props;

  return (
    <button
      className={classNames(
        "mt-4 flex items-center justify-center rounded-lg  bg-msPrimaryDark py-4 text-xl font-semibold text-white disabled:opacity-40",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2 h-6 w-6" />}
      {children}
    </button>
  );
};

export default MetaStreetButton;
