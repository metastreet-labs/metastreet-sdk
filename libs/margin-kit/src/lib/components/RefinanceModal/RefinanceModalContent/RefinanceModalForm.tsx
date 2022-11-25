import { useETHBalance } from "../../../lib/hooks/fetchers/useETHBalance";
import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import Divider from "../../Divider";
import LeverageDropdown from "../../dropdowns/LeverageDropdown";
import RepaymentDropdown from "../../dropdowns/RepaymentDropdown";
import FloorBreakeven from "../../info-rows/FloorBreakeven";
import OwedOrAvailable from "../../info-rows/OwedOrAvailable";
import RepaymentDate from "../../info-rows/RepaymentDate";
import MetaStreetButton from "../../MetaStreetButton";
import PurpleSection from "../../purple-section/PurpleSection";
import { DebtSlider } from "../../sliders/DebtSlider";
import DurationSlider from "../../sliders/DurationSlider";
import { useRefinance } from "../state/useRefinance";

const RefinanceModalForm = () => {
  const { leverageBuy, formState, actions } = useRefinance();

  return (
    <>
      <DebtSlider
        debtAmount={prettyFormatNumber(fromUnits(formState.debtAmount))}
        debtFactor={formState.debtFactor}
        setDebtFactor={actions.setDebtFactor}
      />
      <DurationSlider
        minDuration={daysFromSeconds(formState.activeLimits.minDuration, "up")}
        maxDuration={daysFromSeconds(formState.activeLimits.maxDuration)}
        duration={formState.duration}
        setDuration={actions.setDuration}
      />
      <Divider className="bwl-modal-content-divider" />
      <LeverageDropdown
        purchasePrice={fromUnits(leverageBuy.purchasePrice).toNumber()}
        debtAmount={fromUnits(formState.debtAmount).toNumber()}
        limits={formState.activeLimits}
        tokenCount={1}
      />
      <FloorBreakeven
        collectionAddress={leverageBuy.collectionAddress}
        downPayment={fromUnits(formState.downPayment).toNumber()}
        repayment={formState.quote && fromUnits(formState.quote.repayment).toNumber()}
        tokenCount={1}
        label="New Floor Breakeven"
      />
      <PurpleSection>
        <OwedOrAvailable />
        <RepaymentDropdown
          label="New Repayment"
          debtAmount={fromUnits(formState.debtAmount).toNumber()}
          duration={formState.duration}
          repayment={formState.quote?.repayment && fromUnits(formState.quote.repayment).toNumber()}
        />
        <RepaymentDate duration={formState.duration} />
      </PurpleSection>
      <RefinanceSubmitButton />
    </>
  );
};

const RefinanceSubmitButton = () => {
  const { formState, actions } = useRefinance();
  const { data: balance } = useETHBalance();

  const isOwed = formState.downPayment.gt(0);
  const insufficientFunds = balance && balance.lt(formState.downPayment);
  const buttonDisabled = !formState.quote || !balance || insufficientFunds;

  return (
    <MetaStreetButton disabled={buttonDisabled} onClick={actions.refinance}>
      {isOwed ? (insufficientFunds ? "Insufficient Funds" : "Pay & Extend") : "Withdraw & Extend"}
    </MetaStreetButton>
  );
};

export default RefinanceModalForm;
