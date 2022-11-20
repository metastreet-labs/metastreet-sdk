import { useContext } from "react";
import { BuyWithLeverageContext } from "./context";

export const useBuyWithLeverage = () => {
  const context = useContext(BuyWithLeverageContext);
  if (!context) {
    throw new Error("useBuyWithLeverage must be used within a BuyWithLeverageProvider");
  }
  return context;
};
