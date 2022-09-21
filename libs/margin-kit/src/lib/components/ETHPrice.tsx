import classNames from "classnames";
import { ReactNode } from "react";
import ETHLogo from "./ETHLogo";

type ETHPriceProps = {
  price: ReactNode;
  className?: string;
};

const ETHPrice = (props: ETHPriceProps) => {
  const { price, className = "font-semibold" } = props;

  return (
    <div className={classNames("flex items-center space-x-1", className)}>
      <ETHLogo />
      <span>{price}</span>
    </div>
  );
};

export default ETHPrice;
