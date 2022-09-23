import { Range } from "react-range";

export interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider = (props: SliderProps) => {
  const { value, onChange, ...rest } = props;

  const total = rest.max - rest.min;
  const current = value - rest.min;
  const filledPercent = (current * 100) / total;
  const unfilledPercent = 100 - filledPercent;

  return (
    <Range
      {...rest}
      values={[value]}
      onChange={(values) => onChange(values[0])}
      renderTrack={({ props, children }) => (
        <div {...props} className="bwl-slider-track-wrapper">
          <div className="bwl-slider-track-gradient">
            <div className="bwl-slider-track-unfilled" style={{ width: `${unfilledPercent}%` }} />
          </div>
          {children}
        </div>
      )}
      renderThumb={({ props }) => <div {...props} className="bwl-slider-track-thumb" />}
    />
  );
};

export default Slider;
