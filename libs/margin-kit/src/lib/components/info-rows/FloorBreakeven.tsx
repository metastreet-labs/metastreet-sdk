import ETHPrice from "meta-street/components/ETHPrice";
import { InfoRowLabel, InfoRowValue } from "meta-street/components/InfoRow";
import LoadingText from "meta-street/components/LoadingText";
import { prettyFormatNumber } from "meta-street/utils/numbers";
import { ReactNode } from "react";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";

const FloorBreakeven = () => {
  const { formState } = useBuyWithLeverage();
  const { totalDownPayment, totalRepayment } = formState;

  let floorBreakeven: ReactNode;
  if (totalRepayment) {
    const floorBreakevenAmount = prettyFormatNumber(totalDownPayment + totalRepayment);
    floorBreakeven = <ETHPrice price={floorBreakevenAmount} />;
  } else {
    floorBreakeven = <LoadingText />;
  }

  return (
    <div className="flex items-center">
      <InfoRowLabel>Floor Breakeven</InfoRowLabel>
      <InfoRowValue>{floorBreakeven}</InfoRowValue>
    </div>
  );
};

export default FloorBreakeven;
