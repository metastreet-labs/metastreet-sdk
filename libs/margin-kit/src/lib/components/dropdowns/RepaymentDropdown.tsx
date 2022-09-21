import Decimal from "decimal.js";
import ETHPrice from "meta-street/components/ETHPrice";
import { InfoRowValue } from "meta-street/components/InfoRow";
import LoadingText from "meta-street/components/LoadingText";
import { prettyFormatNumber } from "meta-street/utils/numbers";
import { ReactNode } from "react";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
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
      label={<span className="font-medium">Total Repayment</span>}
      labelVariant="important"
      value={repayment}
    >
      <div className="flex items-center">
        <PurpleSectionLabel>Principal</PurpleSectionLabel>
        <InfoRowValue>
          <ETHPrice price={principal} />
        </InfoRowValue>
      </div>
      <div className="flex items-center">
        <PurpleSectionLabel>Total Interest Amount</PurpleSectionLabel>
        <InfoRowValue>{totalInterest}</InfoRowValue>
      </div>
      <div className="flex items-center">
        <PurpleSectionLabel>Daily Interest</PurpleSectionLabel>
        <InfoRowValue className="font-semibold">{dailyInterest}</InfoRowValue>
      </div>
    </InfoDropdown>
  );
};

export default RepaymentDropdown;
