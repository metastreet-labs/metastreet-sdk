import LeverageDropdown from "meta-street/components/dropdowns/LeverageDropdown";
import RepaymentDropdown from "meta-street/components/dropdowns/RepaymentDropdown";
import FloorBreakeven from "meta-street/components/info-rows/FloorBreakeven";
import RepaymentDate from "meta-street/components/info-rows/RepaymentDate";
import UpfrontPayment from "meta-street/components/info-rows/UpfrontPayment";
import MetaStreetButton from "meta-street/components/MetaStreetButton";
import PurpleSection from "meta-street/components/purple-section/PurpleSection";
import { DebtSlider } from "meta-street/components/sliders/DebtSlider";
import DurationSlider from "meta-street/components/sliders/DurationSlider";
import useETHBalance from "meta-street/lib/hooks/useETHBalance";
import { toUnits } from "meta-street/utils/numbers";
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
