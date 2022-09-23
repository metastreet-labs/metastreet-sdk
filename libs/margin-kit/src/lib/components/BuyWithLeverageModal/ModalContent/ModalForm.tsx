import useETHBalance from "../../../lib/hooks/useETHBalance";
import { toUnits } from "../../../utils/numbers";
import LeverageDropdown from "../../dropdowns/LeverageDropdown";
import RepaymentDropdown from "../../dropdowns/RepaymentDropdown";
import FloorBreakeven from "../../info-rows/FloorBreakeven";
import RepaymentDate from "../../info-rows/RepaymentDate";
import UpfrontPayment from "../../info-rows/UpfrontPayment";
import MetaStreetButton from "../../MetaStreetButton";
import PurpleSection from "../../purple-section/PurpleSection";
import { DebtSlider } from "../../sliders/DebtSlider";
import DurationSlider from "../../sliders/DurationSlider";
import useBuyWithLeverage from "../state/useBuyWithLeverage";

const ModalForm = () => {
  const { balance } = useETHBalance();
  const { formState, actions } = useBuyWithLeverage();
  const { quote, totalDownPayment } = formState;

  const insufficientFunds = balance && balance.lessThan(toUnits(totalDownPayment));
  const buttonDisabled = !quote || !balance || insufficientFunds;

  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <DebtSlider />
        <DurationSlider />
      </div>
      <div className="mt-4 space-y-1">
        <LeverageDropdown />
        <FloorBreakeven />
      </div>
      <PurpleSection>
        <UpfrontPayment />
        <RepaymentDropdown />
        <RepaymentDate />
      </PurpleSection>
      <MetaStreetButton disabled={buttonDisabled} onClick={actions.buy}>
        {insufficientFunds ? "Insufficient Funds" : "Buy"}
      </MetaStreetButton>
    </div>
  );
};

export default ModalForm;
