import Decimal from "decimal.js";
import { VaultLimits } from "../../lib/hooks/useVaultsLimits";
import { fromUnits, prettyFormatNumber } from "../../utils/numbers";
import ETHPrice from "../ETHPrice";
import QuestionMarkCircleIcon from "../icons/QuestionMarkCircleIcon";
import { InfoRow, InfoRowLabel, InfoRowValue } from "../InfoRow";
import Tooltip from "../Tooltip";
import InfoDropdown from "./InfoDropdown";

interface LeverageDropdownProps {
  purchasePrice: number;
  debtAmount: number;
  limits: VaultLimits;
  tokenCount: number;
}

const LeverageDropdown = (props: LeverageDropdownProps) => {
  const { purchasePrice, debtAmount, limits, tokenCount } = props;

  const leverage = new Decimal(purchasePrice / (purchasePrice - debtAmount)).toDecimalPlaces(2);
  let leverageStr: string;
  if (leverage.eq(Infinity) || leverage.lte(0)) leverageStr = "N/A";
  else leverageStr = `${leverage}x`;

  const collateralValue = fromUnits(limits.collateralValue);
  const collateralValueStr = prettyFormatNumber(collateralValue);

  const maxLTV = fromUnits(limits.maxLoanToValue).mul(100).toDecimalPlaces(2);
  const maxLTVStr = `(${maxLTV}% max)`;

  const ltv = new Decimal(debtAmount).div(collateralValue.mul(tokenCount)).mul(100).toDecimalPlaces(2);
  const ltvStr = `${ltv}%`;

  return (
    <InfoDropdown label="Leverage" value={leverageStr} className="bwl-modal-form-leverage-dropdown">
      <InfoRow>
        <InfoRowLabel>MetaStreet Collateral Value</InfoRowLabel>
        <InfoRowValue>
          <ETHPrice price={collateralValueStr} />
        </InfoRowValue>
      </InfoRow>
      <InfoRow>
        <InfoRowLabel>
          <span>MetaStreet LTV</span>
          <Tooltip
            trigger={<QuestionMarkCircleIcon className="bwl-modal-form-leverage-dropdown-ltv-tooltip-icon" />}
            tooltipText={
              <>
                Collateral Value may differ from the purchase price you are paying today, visit the MetaStreet docs page
                for more info.
              </>
            }
          />
        </InfoRowLabel>
        <InfoRowValue>
          <span className="important-text">
            {ltvStr}
            <span className="bwl-modal-form-leverage-dropdown-ltv-max"> {maxLTVStr}</span>
          </span>
        </InfoRowValue>
      </InfoRow>
    </InfoDropdown>
  );
};

export default LeverageDropdown;
