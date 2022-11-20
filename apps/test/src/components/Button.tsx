import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { className, ...rest } = props;
  return <button className={classNames("px-2 py-1 border border-black rounded-lg", className)} {...rest} />;
};

export default Button;
