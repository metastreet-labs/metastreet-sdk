import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import Decimal from "decimal.js";
import Tooltip from "meta-street/components/Tooltip";
import { fromUnits, prettyFormatNumber } from "meta-street/utils/numbers";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import InfoDropdown from "./InfoDropdown";

const LeverageDropdown = () => {
  const { formState, tokens, limits } = useBuyWithLeverage();
  const { debtAmount } = formState;

  const totalPrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);

  const leverage = new Decimal(totalPrice / (totalPrice - debtAmount)).toDecimalPlaces(2);
  let leverageStr: string;
  if (leverage.eq(Infinity) || leverage.lte(0)) leverageStr = "N/A";
  else leverageStr = `${leverage}x`;

  const collateralValue = fromUnits(limits.collateralValue);
  const collateralValueStr = prettyFormatNumber(collateralValue);

  const maxLTV = fromUnits(limits.maxLoanToValue).mul(100).toDecimalPlaces(2);
  const maxLTVStr = `(${maxLTV}% max)`;

  const ltv = new Decimal(debtAmount).div(collateralValue.mul(tokens.length)).mul(100).toDecimalPlaces(2);
  const ltvStr = `${ltv}%`;

  return (
    <InfoDropdown label="Leverage" value={leverageStr}>
      <div className="flex items-center">
        <InfoRowLabel>MetaStreet Collateral Value</InfoRowLabel>
        <InfoRowValue>
          <ETHPrice price={collateralValueStr} />
        </InfoRowValue>
      </div>
      <div className="flex items-center">
        <InfoRowLabel className="space-x-1 text-gray-500">
          <span>MetaStreet LTV</span>
          <Tooltip
            trigger={<QuestionMarkCircleIcon className="h-4 w-4 cursor-help" />}
            tooltipText={
              <>
                Collateral Value may differ from the purchase price you are paying today, visit the MetaStreet docs page
                for more info.
              </>
            }
          />
        </InfoRowLabel>
        <InfoRowValue>
          <span className="font-medium">
            {ltvStr}
            <span className="text-gray-400"> {maxLTVStr}</span>
          </span>
        </InfoRowValue>
      </div>
    </InfoDropdown>
  );
};

export default LeverageDropdown;
