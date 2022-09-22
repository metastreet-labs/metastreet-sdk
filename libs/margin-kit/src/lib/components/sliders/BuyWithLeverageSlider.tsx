import classNames from "classnames";
import { ReactNode } from "react";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import Slider, { SliderProps } from "../Slider";

type BuyWithLeverageSliderProps = SliderProps & {
  label: ReactNode;
  valueDisplay: ReactNode;
  className?: string;
};

const BuyWithLeverageSlider = (props: BuyWithLeverageSliderProps) => {
  const { label, valueDisplay, className, ...rest } = props;

  return (
    <div className={classNames("flex flex-col", className)}>
      <div className="flex items-center">
        <InfoRowLabel>{label}</InfoRowLabel>
        <InfoRowValue>{valueDisplay}</InfoRowValue>
      </div>
      <Slider {...rest} />
    </div>
  );
};

export default BuyWithLeverageSlider;
