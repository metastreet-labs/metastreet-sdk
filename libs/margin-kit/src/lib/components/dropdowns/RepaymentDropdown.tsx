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

  let repaymentNode: ReactNode, totalInterestNode: ReactNode, dailyInterestRateNode: ReactNode;
  if (repayment) {
    repaymentNode = <ETHPrice price={prettyFormatNumber(repayment)} />;

    const totalInterest = new Decimal(repayment).sub(debtAmount);
    totalInterestNode = <ETHPrice price={prettyFormatNumber(totalInterest)} />;

    const dailyInterestRate = totalInterest.div(duration).mul(100).div(debtAmount).toDecimalPlaces(2);
    dailyInterestRateNode = `${dailyInterestRate}%`;
  } else {
    repaymentNode = totalInterestNode = dailyInterestRateNode = <LoadingText className="loading-text-purple" />;
  }

  return (
    <InfoDropdown
      label={<span className="important-text">{label}</span>}
      labelVariant="important"
      value={repaymentNode}
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
        <InfoRowValue>{totalInterestNode}</InfoRowValue>
      </InfoRow>
      <InfoRow>
        <PurpleSectionLabel>Daily Interest Rate</PurpleSectionLabel>
        <InfoRowValue className="important-text">{dailyInterestRateNode}</InfoRowValue>
      </InfoRow>
    </InfoDropdown>
  );
};

export default RepaymentDropdown;
