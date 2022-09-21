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

  const filled = ((value - rest.min) * 100) / (rest.max - rest.min);

  return (
    <Range
      {...rest}
      values={[value]}
      onChange={(values) => onChange(values[0])}
      renderTrack={({ props, children }) => (
        <div {...props} className="flex h-5 w-full flex-col justify-center rounded-full bg-transparent">
          <div className="flex h-[0.375rem] rounded-full bg-gradient-to-r from-[#976CFF] to-[#F99808]">
            {/* Filled Progress */}
            <div
              className="h-full rounded-full"
              style={{
                width: `${filled}%`,
              }}
            />
            <div className="flex-grow bg-gray-200" />
          </div>
          {children}
        </div>
      )}
      // Drag Handle
      renderThumb={({ props }) => (
        <div {...props} className="h-5 w-5 rounded-md border-2 border-msPrimaryDark bg-msCardBackground" />
      )}
    />
  );
};

export default Slider;
