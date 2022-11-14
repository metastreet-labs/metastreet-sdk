import { useRef } from "react";
import ETHLogo from "../ETHLogo";
export const Input = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="lsf-input-outer-wrapper">
      <label className="lsf-input-label" htmlFor="amount-input">
        Amount (ETH)
      </label>
      <div className="lst-input-inner-wrapper" onClick={() => ref.current?.focus()}>
        <ETHLogo className="lsf-input-leading" />
        <input id="amount-input" type="number" className="lsf-input-input" ref={ref} />
      </div>
    </div>
  );
};
