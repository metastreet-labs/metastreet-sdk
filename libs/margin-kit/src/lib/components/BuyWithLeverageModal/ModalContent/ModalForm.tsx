import useETHBalance from "../../../lib/hooks/useETHBalance";
import { toUnitsBigNum } from "../../../utils/numbers";
import Divider from "../../Divider";
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
  const { data: balance } = useETHBalance();
  const { formState, actions } = useBuyWithLeverage();
  const { quote, totalDownPayment } = formState;

  const insufficientFunds = balance && balance.lt(toUnitsBigNum(totalDownPayment));
  const buttonDisabled = !quote || !balance || insufficientFunds;

  return (
    <div className="bwl-modal-form">
      <DebtSlider
        debtAmount={formState.debtAmount}
        debtFactor={formState.debtFactor}
        setDebtFactor={actions.setDebtFactor}
      />
      <DurationSlider />
      <Divider className="bwl-modal-content-divider" />
      <LeverageDropdown />
      <FloorBreakeven />
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
