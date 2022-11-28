import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => {
  const { className, loading, disabled, children, ...rest } = props;
  return (
    <button
      disabled={disabled || loading}
      className={classNames("px-2 py-1 border border-black rounded-lg", className)}
      {...rest}
    >
      {loading ? "Busy..." : children}
    </button>
  );
};

export default Button;
