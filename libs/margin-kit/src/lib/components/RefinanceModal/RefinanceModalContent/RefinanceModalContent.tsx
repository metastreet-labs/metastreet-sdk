import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import Divider from "../../Divider";
import LeverageDropdown from "../../dropdowns/LeverageDropdown";
import FloorBreakeven from "../../info-rows/FloorBreakeven";
import MetaStreetModal from "../../MetaStreetModal";
import { DebtSlider } from "../../sliders/DebtSlider";
import DurationSlider from "../../sliders/DurationSlider";
import RefinanceTokenInfo from "../../token-info/RefinanceTokenInfo";
import useRefinance from "../state/useRefinance";

interface RefinanceModalContentProps {
  onClose: () => void;
}

const RefinanceModalContent = (props: RefinanceModalContentProps) => {
  const { leverageBuy, formState, actions, limits } = useRefinance();

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
        minDuration={daysFromSeconds(limits.minDuration, "up")}
        maxDuration={daysFromSeconds(limits.maxDuration)}
        duration={formState.duration}
        setDuration={actions.setDuration}
      />
      <LeverageDropdown
        purchasePrice={fromUnits(leverageBuy.purchasePrice).toNumber()}
        debtAmount={fromUnits(formState.debtAmount).toNumber()}
        limits={limits}
        tokenCount={1}
      />
      <FloorBreakeven
        collectionAddress={leverageBuy.collectionAddress}
        downPayment={fromUnits(formState.downPayment).toNumber()}
        repayment={formState.quote && fromUnits(formState.quote.repayment).toNumber()}
        tokenCount={1}
        label="New Floor Breakeven"
      />
      <div className="flex h-56 items-center justify-center">This is a refinance modal</div>
    </>
  );
};

export default RefinanceModalContent;
