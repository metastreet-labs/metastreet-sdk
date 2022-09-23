import { ReactNode } from "react";
import { prettyFormatNumber } from "../../utils/numbers";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import { InfoRowLabel, InfoRowValue } from "../InfoRow";
import LoadingText from "../LoadingText";

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
