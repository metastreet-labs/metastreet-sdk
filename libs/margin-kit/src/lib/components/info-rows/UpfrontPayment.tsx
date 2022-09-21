import { prettyFormatNumber } from "../../utils/numbers";
import useBuyWithLeverage from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import { InfoRowValue } from "../InfoRow";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";

const UpfrontPayment = () => {
  const { formState } = useBuyWithLeverage();
  return (
    <div className="flex items-center">
      <PurpleSectionLabel>Upfront Payment</PurpleSectionLabel>
      <InfoRowValue>
        <ETHPrice price={prettyFormatNumber(formState.totalDownPayment)} />
      </InfoRowValue>
    </div>
  );
};

export default UpfrontPayment;
