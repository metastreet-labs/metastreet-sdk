import classNames from "classnames";
import { ReactNode } from "react";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import Slider, { SliderProps } from "../Slider";

type BuyWithLeverageSliderProps = SliderProps & {
  label: ReactNode;
  valueDisplay: ReactNode;
  className?: string;
};

const BuyWithLeverageSlider = (props: BuyWithLeverageSliderProps) => {
  const { label, valueDisplay, className, ...rest } = props;

  return (
    <div className={classNames("bwl-slider-wrapper", className)}>
      <InfoRow>
        <InfoRowLabel>{label}</InfoRowLabel>
        <InfoRowValue>{valueDisplay}</InfoRowValue>
      </InfoRow>
      <Slider {...rest} />
    </div>
  );
};

export default BuyWithLeverageSlider;
