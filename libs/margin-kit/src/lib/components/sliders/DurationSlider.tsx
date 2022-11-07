import BuyWithLeverageSlider from "./BuyWithLeverageSlider";

interface DurationSliderProps {
  minDuration: number;
  maxDuration: number;
  duration: number;
  setDuration: (duration: number) => void;
}

export const DurationSlider = (props: DurationSliderProps) => {
  const { minDuration, maxDuration, duration, setDuration } = props;

  return (
    <BuyWithLeverageSlider
      min={minDuration}
      max={maxDuration}
      step={1}
      value={duration}
      onChange={setDuration}
      label="Duration"
      valueDisplay={<span className="font-semibold">{duration} days</span>}
      className="bwl-modal-form-duration-slider"
    />
  );
};

export default DurationSlider;
