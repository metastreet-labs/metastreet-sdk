import Decimal from "decimal.js";
import { ReactNode } from "react";
import { prettyFormatNumber } from "../../utils/numbers";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";
import InfoDropdown from "./InfoDropdown";

interface RepaymentDropdownProps {
  label: ReactNode;
  debtAmount: number;
  duration: number;
  repayment?: number;
}

const RepaymentDropdown = (props: RepaymentDropdownProps) => {
  const { label, debtAmount, duration, repayment } = props;

  const principal = prettyFormatNumber(debtAmount);

  let rep: ReactNode, totalInterest: ReactNode, dailyInterest: ReactNode;
  if (repayment) {
    rep = <ETHPrice price={prettyFormatNumber(repayment)} />;

    const interestAmount = new Decimal(repayment).sub(debtAmount);
    totalInterest = <ETHPrice price={prettyFormatNumber(interestAmount)} />;

    const dailyInterestPercent = interestAmount.div(duration).mul(100).div(debtAmount).toDecimalPlaces(2);
    dailyInterest = `${dailyInterestPercent}%`;
  } else {
    rep = totalInterest = dailyInterest = <LoadingText className="loading-text-purple" />;
  }

  return (
    <InfoDropdown
      label={<span className="important-text">{label}</span>}
      labelVariant="important"
      value={rep}
      className="bwl-modal-form-repayment-dropdown"
    >
      <InfoRow>
        <PurpleSectionLabel>Principal</PurpleSectionLabel>
        <InfoRowValue>
          <ETHPrice price={principal} />
        </InfoRowValue>
      </InfoRow>
      <InfoRow>
        <PurpleSectionLabel>Total Interest</PurpleSectionLabel>
        <InfoRowValue>{totalInterest}</InfoRowValue>
      </InfoRow>
      <InfoRow>
        <PurpleSectionLabel>Daily Interest Rate</PurpleSectionLabel>
        <InfoRowValue className="important-text">{dailyInterest}</InfoRowValue>
      </InfoRow>
    </InfoDropdown>
  );
};

export default RepaymentDropdown;
