import { ReactNode } from "react";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import Slider, { SliderProps } from "../Slider";

type BuyWithLeverageSliderProps = SliderProps & {
  label: ReactNode;
  valueDisplay: ReactNode;
};

const BuyWithLeverageSlider = (props: BuyWithLeverageSliderProps) => {
  const { label, valueDisplay, ...rest } = props;

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <InfoRowLabel>{label}</InfoRowLabel>
        <InfoRowValue>{valueDisplay}</InfoRowValue>
      </div>
      <Slider {...rest} />
    </div>
  );
};

export default BuyWithLeverageSlider;
