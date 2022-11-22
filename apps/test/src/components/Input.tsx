import classNames from "classnames";
import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, ...rest } = props;
  return <input className={classNames("px-2 border rounded")} {...rest} />;
};

export default Input;
