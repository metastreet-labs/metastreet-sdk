import classNames from "classnames";
import { ReactNode } from "react";
import ETHPrice from "./ETHPrice";

interface ETHPriceColoredProps {
  price: ReactNode;
  color: "green" | "red";
  className?: string;
}

const ETHPriceColored = (props: ETHPriceColoredProps) => {
  const { price, color, className } = props;

  return (
    <ETHPrice
      price={price}
      className={classNames(
        "eth-price-colored",
        {
          "eth-price-colored-red": color == "red",
          "eth-price-colored-green": color == "green",
        },
        className
      )}
    />
  );
};

export default ETHPriceColored;
