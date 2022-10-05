import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import BuyWithLeverageSlider from "./BuyWithLeverageSlider";

export const DurationSlider = () => {
  const { formState, actions, limits } = useBuyWithLeverage();
  const { duration } = formState;
  const { minDuration, maxDuration } = limits;

  return (
    <BuyWithLeverageSlider
      min={Math.ceil(minDuration / 86400)}
      max={Math.floor(maxDuration / 86400)}
      step={1}
      value={duration}
      onChange={actions.setDuration}
      label="Duration"
      valueDisplay={<span className="font-semibold">{duration} days</span>}
      className="bwl-modal-form-duration-slider"
    />
  );
};

export default DurationSlider;
