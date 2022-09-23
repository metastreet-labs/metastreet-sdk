import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import BuyWithLeverageSlider from "./BuyWithLeverageSlider";

export const DurationSlider = () => {
  const { formState, actions, limits } = useBuyWithLeverage();
  const { duration } = formState;
  const { minDuration, maxDuration } = limits;

  return (
    <BuyWithLeverageSlider
      min={minDuration}
      max={maxDuration}
      step={1}
      value={duration}
      onChange={actions.setDuration}
      label="Duration"
      valueDisplay={<span className="font-semibold">{duration} days</span>}
    />
  );
};

export default DurationSlider;
