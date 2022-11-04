import { ReactNode } from "react";
import ETHPrice from "../ETHPrice";
import BuyWithLeverageSlider from "./BuyWithLeverageSlider";

interface DebtSliderProps {
  debtAmount: ReactNode;
  debtFactor: number;
  setDebtFactor: (debtFactor: number) => void;
}

export const DebtSlider = (props: DebtSliderProps) => {
  const { debtAmount, debtFactor, setDebtFactor } = props;

  return (
    <BuyWithLeverageSlider
      min={0.05}
      max={1}
      step={0.01}
      value={debtFactor}
      onChange={setDebtFactor}
      label="Total Debt Amount"
      valueDisplay={<ETHPrice price={debtAmount} />}
      className="bwl-modal-form-debt-slider"
    />
  );
};
