import Decimal from "decimal.js";
import { ReactNode } from "react";
import { prettyFormatNumber } from "../../utils/numbers";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";
import InfoDropdown from "./InfoDropdown";

const RepaymentDropdown = () => {
  const { formState } = useBuyWithLeverage();
  const { debtAmount, duration, totalRepayment } = formState;

  const principal = prettyFormatNumber(debtAmount);

  let repayment: ReactNode, totalInterest: ReactNode, dailyInterest: ReactNode;
  if (totalRepayment) {
    repayment = <ETHPrice price={prettyFormatNumber(totalRepayment)} />;

    const interestAmount = new Decimal(totalRepayment).sub(debtAmount);
    totalInterest = <ETHPrice price={prettyFormatNumber(interestAmount)} />;

    const dailyInterestPercent = interestAmount.div(duration).mul(100).div(debtAmount).toDecimalPlaces(2);
    dailyInterest = `${dailyInterestPercent}%`;
  } else {
    repayment = totalInterest = dailyInterest = <LoadingText className="bg-msPrimaryDark/50" />;
  }

  return (
    <InfoDropdown
      label={<span className="bwl-modal-form-purple-section-label">Total Repayment</span>}
      labelVariant="important"
      value={repayment}
      className="bwl-modal-form-repayment-dropdown"
    >
      <InfoRow>
        <PurpleSectionLabel>Principal</PurpleSectionLabel>
        <InfoRowValue>
          <ETHPrice price={principal} />
        </InfoRowValue>
      </InfoRow>
      <InfoRow>
        <PurpleSectionLabel>Total Interest Amount</PurpleSectionLabel>
        <InfoRowValue>{totalInterest}</InfoRowValue>
      </InfoRow>
      <InfoRow>
        <PurpleSectionLabel>Daily Interest</PurpleSectionLabel>
        <InfoRowValue className="important-text">{dailyInterest}</InfoRowValue>
      </InfoRow>
    </InfoDropdown>
  );
};

export default RepaymentDropdown;
