import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import BuyWithLeverageSlider from "./BuyWithLeverageSlider";

export const DebtSlider = () => {
  const { formState, actions } = useBuyWithLeverage();
  const { debtFactor, debtAmount } = formState;
  const { setDebtFactor } = actions;

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
