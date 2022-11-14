import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import Divider from "../../Divider";
import LeverageDropdown from "../../dropdowns/LeverageDropdown";
import RepaymentDropdown from "../../dropdowns/RepaymentDropdown";
import FloorBreakeven from "../../info-rows/FloorBreakeven";
import OwedOrAvailable from "../../info-rows/OwedOrAvailable";
import RepaymentDate from "../../info-rows/RepaymentDate";
import MetaStreetModal from "../../MetaStreetModal";
import PurpleSection from "../../purple-section/PurpleSection";
import { DebtSlider } from "../../sliders/DebtSlider";
import DurationSlider from "../../sliders/DurationSlider";
import RefinanceTokenInfo from "../../token-info/RefinanceTokenInfo";
import useRefinance from "../state/useRefinance";
import RefinanceSubmitButton from "./RefinanceSubmitButton";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  const { leverageBuy, formState, actions } = useRefinance();

  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      <RefinanceTokenInfo leverageBuy={leverageBuy} />
      <Divider className="bwl-modal-content-divider" />
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

export default RefinanceModalContent;
