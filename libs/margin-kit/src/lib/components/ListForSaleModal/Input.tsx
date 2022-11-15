import classNames from "classnames";
import { ChangeEvent, useRef } from "react";
import ETHLogo from "../ETHLogo";
import { useListForSale } from "./state/ListForSaleContext";

// Source: @uniswap/interface
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

// Source: @uniswap/interface
const FLOAT_REGEX = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NUMBERS_AND_DOT_REGEXP = /^[0-9]*[.]?[0-9]*$/;

export const Input = () => {
  const { formState, actions } = useListForSale();
  const { listingPrice, listingPriceError } = formState;
  const ref = useRef<HTMLInputElement | null>(null);

  // Source: @uniswap/interface
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextUserInput = event.target.value.replace(/,/g, ".");
    if (nextUserInput === "" || FLOAT_REGEX.test(escapeRegExp(nextUserInput))) {
      const changeEvent = event;
      changeEvent.target.value = nextUserInput;
      const decimalString = nextUserInput.split(".")[1];
      // More decimals than 18 could cause an underflow error with BigNumber
      if (decimalString && decimalString.length > 18) return;
      actions.setListingPrice(changeEvent.target.value);
    }
  };

  return (
    <div className="lsf-input-outer-wrapper">
      <label className="lsf-input-label" htmlFor="amount-input">
        Amount (ETH)
      </label>
      <div
        className={classNames("lst-input-inner-wrapper", {
          "lsf-input-inner-wrapper-error": Boolean(listingPriceError),
        })}
        onClick={() => ref.current?.focus()}
      >
        <ETHLogo className="lsf-input-leading" />
        <input
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          pattern={NUMBERS_AND_DOT_REGEXP.toString()}
          minLength={1}
          maxLength={79}
          spellCheck={false}
          placeholder="0.0"
          id="amount-input"
          className="lsf-input-input"
          ref={ref}
          value={listingPrice}
          onChange={onChange}
        />
      </div>
      {listingPriceError ? <span className="lsf-input-error-message">{listingPriceError}</span> : null}
    </div>
  );
};
