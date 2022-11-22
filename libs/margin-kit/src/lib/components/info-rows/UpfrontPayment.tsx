import { prettyFormatNumber } from "../../utils/numbers";
import { useBuyWithLeverage } from "../BuyWithLeverageModal/state/useBuyWithLeverage";
import ETHPrice from "../ETHPrice";
import { InfoRow, InfoRowValue } from "../InfoRow";
import PurpleSectionLabel from "../purple-section/PurpleSectionLabel";

const UpfrontPayment = () => {
  const { formState } = useBuyWithLeverage();
  return (
    <InfoRow className="bwl-modal-form-upfront-payment">
      <PurpleSectionLabel>Upfront Payment</PurpleSectionLabel>
      <InfoRowValue>
        <ETHPrice price={prettyFormatNumber(formState.totalDownPayment)} />
      </InfoRowValue>
    </InfoRow>
  );
};

export default UpfrontPayment;
