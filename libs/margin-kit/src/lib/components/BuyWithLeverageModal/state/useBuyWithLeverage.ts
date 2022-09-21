import { useContext } from "react";
import { BuyWithLeverageContext } from "./context";

const useBuyWithLeverage = () => {
  const context = useContext(BuyWithLeverageContext);
  if (!context) {
    throw new Error("useBuyWithLeverage must be used within a BuyWithLeverageProvider");
  }
  return context;
};

export default useBuyWithLeverage;
