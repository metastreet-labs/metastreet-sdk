import classNames from "classnames";
import { ReactNode } from "react";
import ETHLogo from "./ETHLogo";

interface ETHPriceProps {
  price: ReactNode;
  className?: string;
}

const ETHPrice = (props: ETHPriceProps) => {
  const { price, className = "eth-price-default" } = props;

  return (
    <div className={classNames("eth-price-wrapper", className)}>
      <ETHLogo />
      <span>{price}</span>
    </div>
  );
};

export default ETHPrice;
