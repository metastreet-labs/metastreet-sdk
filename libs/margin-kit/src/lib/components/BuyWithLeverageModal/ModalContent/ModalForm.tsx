import useETHBalance from "../../../lib/hooks/useETHBalance";
import { daysFromSeconds } from "../../../utils/dates";
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
  const { formState, actions, tokens } = useBuyWithLeverage();

  const insufficientFunds = balance && balance.lt(toUnitsBigNum(formState.totalDownPayment));
  const buttonDisabled = !formState.quote || !balance || insufficientFunds;
  const purchasePrice = tokens.reduce((s, t) => s + t.tokenPrice, 0);

  return (
    <div className="bwl-modal-form">
      <DebtSlider
        debtAmount={formState.debtAmount}
        debtFactor={formState.debtFactor}
        setDebtFactor={actions.setDebtFactor}
      />
      <DurationSlider
        minDuration={daysFromSeconds(formState.activeVaultLimits.minDuration, "up")}
        maxDuration={daysFromSeconds(formState.activeVaultLimits.maxDuration)}
        duration={formState.duration}
        setDuration={actions.setDuration}
      />
      <Divider className="bwl-modal-content-divider" />
      <LeverageDropdown
        purchasePrice={purchasePrice}
        debtAmount={formState.debtAmount}
        limits={formState.activeVaultLimits}
        tokenCount={tokens.length}
      />
      <FloorBreakeven
        collectionAddress={tokens[0].collectionAddress}
        downPayment={formState.totalDownPayment}
        repayment={formState.totalRepayment}
        tokenCount={tokens.length}
        label={tokens.length > 1 ? "Floor Breakeven (Per Asset)" : "Floor Breakeven"}
      />
      <PurpleSection>
        <UpfrontPayment />
        <RepaymentDropdown
          label="Total Repayment"
          debtAmount={formState.debtAmount}
          duration={formState.duration}
          repayment={formState.totalRepayment}
        />
        <RepaymentDate />
      </PurpleSection>
      <MetaStreetButton disabled={buttonDisabled} onClick={actions.buy}>
        {insufficientFunds ? "Insufficient Funds" : "Buy"}
      </MetaStreetButton>
    </div>
  );
};

export default ModalForm;
