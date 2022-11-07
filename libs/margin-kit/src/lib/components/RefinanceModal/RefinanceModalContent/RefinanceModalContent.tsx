import { daysFromSeconds } from "../../../utils/dates";
import { fromUnits, prettyFormatNumber } from "../../../utils/numbers";
import Divider from "../../Divider";
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
  const debtAmount = prettyFormatNumber(fromUnits(formState.debtAmount));

  return (
    <>
      <MetaStreetModal.Title>Refinance</MetaStreetModal.Title>
      <RefinanceTokenInfo leverageBuy={leverageBuy} />
      <Divider className="bwl-modal-content-divider" />
      <DebtSlider debtAmount={debtAmount} debtFactor={formState.debtFactor} setDebtFactor={actions.setDebtFactor} />
      <DurationSlider
        minDuration={daysFromSeconds(limits.minDuration) || 1}
        maxDuration={daysFromSeconds(limits.maxDuration)}
        duration={formState.duration}
        setDuration={actions.setDuration}
      />
      <div className="flex h-56 items-center justify-center">This is a refinance modal</div>
    </>
  );
};

export default RefinanceModalContent;
